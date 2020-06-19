import React from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonHeader, IonToolbar, IonList, IonItemDivider, IonItem, IonLabel, IonCheckbox, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab2.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import moment from 'moment';

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
    update: ""
  }

  
  componentDidUpdate(prevProps) {
    if (this.props["location"] !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.getData()
    this.setState({
      loading: 2 + Math.random()
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
              update: val
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

        let now = new Date();
        Object.keys(user_data["success"].shopping_list).forEach(item=>{
          let date = user_data["success"].shopping_list[item]
          let t = checkWeek(date);
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

        checkboxList = test;
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

  render () {
    //const [checked, setChecked] = useState(false);
    // redirect to login.
    console.log(checkboxList);
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
      <IonContent>
        <IonTitle size="large" class="welcome"><b>Shopping List</b></IonTitle>
          <br></br>
          <IonCard>
            <IonCardHeader>
              Showing list for <b>this week, {start_week}-{end_week}</b>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
              {checkboxList.map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox slot="end" color="secondary" onIonChange={e => this.removeCheck(e, val, i)} value={val} checked={isChecked} />
                </IonItem>
              ))}
              </IonList>
            </IonCardContent>
          </IonCard>
      </IonContent>
    );
  };
}

export default Tab2;

