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
    loading: 1
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

        Object.keys(user_data["success"].schedule).forEach(date => {
          let t = checkWeek(date)
          console.log(t)
          // Check if same week
          if (t)
            test.push({val: user_data["success"]["schedule"][date]["name"], isChecked: false})
        })
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
      <div className="container">
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
                  <IonCheckbox slot="end" color="secondary" value={val} checked={isChecked} />
                </IonItem>
              ))}
              </IonList>
            </IonCardContent>
          </IonCard>
      </div>
    );
  };
}

export default Tab2;

