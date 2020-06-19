import React from 'react';
import { IonRow, IonCard, IonCardHeader, IonCardContent, IonHeader, IonToolbar, IonList, IonItemDivider, IonItem, IonLabel, IonCheckbox, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab5.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import moment from 'moment';

var user_data = {}
var list = [];
var item = "";


class Tab5 extends React.Component {
  
  state = {
    loading: 1,
    update: ""
  }

  getData () {
    get("login").then(data => {
      user_data = data;
      // If user is authenticated
      if (data && data.success) {
        this.setState({
          loading: 0
        });
        // Update shoping list
        list = Object.keys(data["success"]["inventory"])
        console.log(data)
      }
      // This makes it redirect to login.
      else {
        alert("NOT AUTHENTICATED");
        this.setState({
          loading: -1
        });
      }
    })
  }

  additem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      loading: 1
    });
    fetch(`https://Rationality--bach5000.repl.co/invadd/`+user_data["success"]["_id"]+"/"+item)
    .then(response => response.json()).then(content => {
      console.log(content);
      user_data = content;
      list.push(item);
      console.log(content["success"]["inventory"])
      set("login", user_data);
      this.setState({
        loading: 0
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
        <IonTitle size="large" class="welcome"><b>Inventory</b></IonTitle>
          <br></br>
          <form onSubmit={this.additem}>
          <IonRow>
              <input placeholder="Type to add item..." className="textbox" type="text" onChange={this.handleChange}></input>
          </IonRow>
        </form>
          <IonCard>
            <IonCardHeader>
              Showing all items
            </IonCardHeader>
            <IonCardContent>
              <IonList>
              {list.map((val , i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                </IonItem>
              ))}
              </IonList>
            </IonCardContent>
          </IonCard>
      </IonContent>
      </IonPage>
    );
  };
}

export default Tab5;

