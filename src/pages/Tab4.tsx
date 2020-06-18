import React from 'react';
import { IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import HelpContainer from '../components/HelpContainer';
import './Tab4.css';
import RecipeList from '../components/RecipeList';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';

var user_data = {}

class Tab4 extends React.Component {
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
      }
      // This makes it redirect to login.
      else {
        this.setState({
          loading: -1
        });
      }
    })
  }

  logout () {
    // Reset stuff
    set("login", {});
  }

  render () {
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
        <IonTitle size="large" class="welcome"><b>Recipes</b></IonTitle>
        <br></br>
        <RecipeList/>
      </IonContent>
    </IonPage>
    );
  }
}

export default Tab4;
