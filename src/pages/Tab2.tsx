import React from 'react';
import { IonHeader, IonToolbar, IonList, IonItemDivider, IonItem, IonLabel, IonCheckbox, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import HelpContainer from '../components/HelpContainer';
import './Tab2.css';
import RecipeList from '../components/RecipeList';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';

var user_data = {}

const checkboxList = [
  
];

class Tab2 extends React.Component {
  
  state = {
    loading: 1
  }
  getData () {
    get("login").then(data => {
      user_data = data;
      // If user is authenticated
      if (data.success) {
        this.setState({
          loading: 0
        });
        // Update shoping list
        user_data["success"].shopping_list.forEach(x => {
          checkboxList.push({val: x, isChecked: false})
        })
      }
      // This makes it redirect to login.
      else {
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
      <IonPage>
        <IonContent>
        <IonTitle size="large" class="welcome"><b>Shopping List</b></IonTitle>
        <br></br>
          <IonList>
            <IonItemDivider>For: June[x] - June[x]</IonItemDivider>
            {checkboxList.map(({ val, isChecked }, i) => (
              <IonItem key={i}>
                <IonLabel>{val}</IonLabel>
                <IonCheckbox slot="end" color="secondary" value={val} checked={isChecked} />
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
}

export default Tab2;

