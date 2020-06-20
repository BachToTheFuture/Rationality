import React from 'react';
import { IonToast, IonCard, IonCardHeader, IonCardContent, IonHeader, IonToolbar, IonList, IonItemDivider, IonItem, IonLabel, IonCheckbox, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab2.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';

var user_data = {}
var checkboxList = [];
var today = moment();
var start_week = today.startOf('week').format("MM/DD")
var end_week = today.endOf('week').format("MM/DD")

function checkWeek(input) {
  input = moment(input, 'YYYY-MM-DD')
  return input.isSame(today,"week")
}

class Tab2 extends React.Component {
  
  state = {
    loading: 1,
    update: "",
    showToast: false,
    toastText: "",
  }

  
  componentDidUpdate(prevProps) {
    if (this.props["location"] !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({
      loading: 1
    })
  }

  removeCheck(e:any, val, i) {
    let uri = "https://Rationality--bach5000.repl.co/checkoff"
    fetch(uri,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"uid": user_data["success"]["_id"], "item":val})
    }).then(response => response.json()).then(content => {
        console.log(content);
        if (content.success) {
            user_data = content;
            set('login', content);
            console.log(val);
            console.log(e.detail.checked);
            // Remove object
            delete checkboxList[i];
            
            this.setState({
              update: val,
              toastText: "Added " + val + " to inventory",
              showToast: true
            });
        }
    })
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
        let test = []
        console.log(user_data["success"].shopping_list);
        Object.keys(user_data["success"].shopping_list).forEach(item=>{
          let date = user_data["success"].shopping_list[item]
          let t = checkWeek(date);
          console.log("CHECK IF SAME WEEK" + t)
          if (t) {
              test.push({val: item, isChecked: false})
          }
        })

        /*
        Object.keys(user_data["success"].schedule).forEach(date => {
          let t = checkWeek(date)
          console.log(t)
          // Check if same week
          if (t) {
            user_data["success"]["schedule"][date]["ing"].forEach(x=>{
                test.push({val: x, isChecked: false})
            })
          }
        })
        */
        console.log(test);
        checkboxList = test;
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

  render () {
    //const [checked, setChecked] = useState(false);
    // redirect to login.
    console.log(checkboxList);
    if (this.state.loading === -1) {
      return <Redirect to="/" exact />
    }
    if (this.state.loading === 1) {
      this.getData()
    }
    return (
      <IonPage>

      <IonContent>
        <h1 className="welcome"><b>Shopping List</b></h1>
          <br></br>
          <IonCard>
            <Card.Header>
              Showing list for <b>this week, {start_week}-{end_week}</b>
            </Card.Header>
            <Card.Body>
              <IonList>
              {checkboxList.map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox slot="end" color="secondary" onIonChange={e => this.removeCheck(e, val, i)} value={val} checked={isChecked} />
                </IonItem>
              ))}
              </IonList>
            </Card.Body>
          </IonCard>
          <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast:false})}
            message={this.state.toastText}
            duration={1000}
            color="success"
          />
      </IonContent>
      </IonPage>
    );
  };
}

export default Tab2;

