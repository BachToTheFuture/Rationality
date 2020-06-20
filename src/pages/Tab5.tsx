import React from 'react';
import { IonToast, IonRow, IonCard, IonCardHeader, IonCardContent, IonHeader, IonToolbar, IonList, IonItemDivider, IonItem, IonLabel, IonCheckbox, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab5.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';

var user_data = {}
var list = [];
var item = "";


class Tab5 extends React.Component {
  
  state = {
    loading: 1,
    update: "",
    toastText:"",
    showToast: false
  }

  componentDidUpdate(prevProps) {
    if (this.props["location"] !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("JUST OPENED TAB5")
    this.setState({
      loading: 1
    })
  }


  getData () {
    get("login").then(data => {
      // If user is authenticated
      if (data && data.success) {
        this.setState({
          loading: 0
        });
        user_data = data;
        // Update shoping list
        list = Object.keys(data["success"]["inventory"])
        console.log("CHECKING DATA HERE HERE HERE")
        console.log(data)
      }
      // This makes it redirect to login.
      else {
        this.setState({
          loading: -1,
          toastText: "You are not authorized.",
          showToast: true
        });
      }
    })
  }

  additem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://Rationality--bach5000.repl.co/invadd`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"uid": user_data["success"]["_id"], "item":item})
    }).then(response => response.json()).then(content => {
      console.log(content);
      user_data = content;
      list.push(item);
      console.log(content["success"]["inventory"])
      set("login", user_data);
      this.setState({
        loading: 0,
        toastText: item + " has been added to your inventory!",
        showToast: true
      });
      // How to turn this into components?
    })
  }

  removeitem = (val) => {

    fetch(`https://Rationality--bach5000.repl.co/invrmv`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"uid": user_data["success"]["_id"], "item":val})
    }).then(response => response.json()).then(content => {
      user_data = content;
      set("login", user_data);
      list.splice(list.indexOf(val), 1);
      console.log(`https://Rationality--bach5000.repl.co/invrmv/`+user_data["success"]["_id"]+"/"+val);
      console.log(content["success"]["inventory"])
      this.setState({
        toastText: val + " has been removed.",
        showToast: true
      });
      // How to turn this into components?
    })
  }

  handleChange (e:any) {
      item = e.target.value;
  }

  render () {
    //const [checked, setChecked] = useState(false);
    // redirect to login.
    console.log(list);
    if (this.state.loading === -1) {
      return <Redirect to="/" exact />
    }
    if (this.state.loading === 1) {
      return (
        <IonPage>
          {this.getData()}
        <IonContent>
          <div className="container">
            <IonSpinner className="big-spinner" name="crescent" />
          </div>
        </IonContent>
      </IonPage>
      )
    }
    return (
      <IonPage>
      <IonContent>
        <h1 className="welcome"><b>Inventory</b></h1>
          <br></br>
          <form onSubmit={this.additem}>
          <IonRow>
              <input placeholder="Type to add item..." className="textbox" type="text" onChange={this.handleChange}></input>
          </IonRow>
        </form>
          <IonCard>
            <Card.Header>
              Showing all items
            </Card.Header>
            <Card.Body>
              <IonList>
              {list.map((val , i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <a style={{fontSize:"30px", fontWeight:"bold"}} onClick={(e)=>this.removeitem(val)}>{"×"}</a>
                </IonItem>
              ))}
              </IonList>
            </Card.Body>
          </IonCard>
          <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast:false})}
            message={this.state.toastText}
            duration={2000}
            color="success"
          />
      </IonContent>
      </IonPage>
    );
  };
}

export default Tab5;

