import React from 'react';
import { IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import HelpContainer from '../components/HelpContainer';
import './Tab3.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';

var user_data = {}

class Tab3 extends React.Component {
  state = {
    loading: 1
  }
  getData () {
    get("login").then(data => {
      user_data = data;
      console.log("DATA ASDFASDF")
      console.log(user_data);
      // If user is authenticated
      if (data && data.success) {
        this.setState({
          loading: 0
        });
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

  logout () {
    // Reset stuff
    set("login", {});
  }

  render () {
    // redirect to login.
    console.log(this.state.loading);
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
          <IonTitle size="large" class="welcome">Good morning,</IonTitle>
          <IonTitle size="large" class="usertitle"><b>{user_data["success"]["name"]}!</b></IonTitle>
          <HelpContainer/>
          
          <IonButton onClick={this.logout} class="center" href="/" color="tertiary" shape="round">Sign Out</IonButton>
        </IonContent>
      </IonPage>
    );
  }
}

export default Tab3;
