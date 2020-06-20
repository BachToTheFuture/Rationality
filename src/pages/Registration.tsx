import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { IonToast, IonRow, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonItemDivider } from '@ionic/react';
import { personAdd, arrowBack, ellipse, lockOpen, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';

import { set } from "../storage";
import "./LoginView.css";

class Registration extends React.Component {
    state = {
      registered: false,
      showToast: false,
      toastText:""
    }
    setRedirect = (event: any) => {
      fetch(`https://Rationality--bach5000.repl.co/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'form': {'username': username, 'password':password, 'password2':password2}})
      }).then(response => response.json()).then(content => {
        console.log(content);
        if (content.success) {
          this.setState({
            registered: true
          });
        }
        else {
          this.setState({
            toastText: content.msg,
            showToast: true
          });
        }
      })
    }
    renderRedirect = () => {
      if (this.state.registered) {
        return <Redirect to='/' exact/>
      }
    }
    render () {
      return (
        <IonPage>
          <IonContent>
         <div>
          {this.renderRedirect()}
          <div className="container">
        <h1 className="usertitle"><b>Register</b></h1>
        <form>
            <IonRow>
                <input className="textbox" onChange={handleUsername} id="username" type="text" name="username" placeholder="Username"></input>
            </IonRow>
            <IonRow>
            <input className="textbox" onChange={handlePassword} id="password" type="password" name="password" placeholder="Password"></input>
            </IonRow>
            <IonRow>
            <input className="textbox" onChange={handlePassword2} id="password2" type="password" name="password2" placeholder="Reenter password"></input>
            </IonRow>
            <IonRow>
            <IonButton onClick={this.setRedirect} class="center" shape="round">
            <IonIcon className="special-icon" icon={personAdd}/>
            <span className="recipe-label special-text"> Register </span>
            </IonButton>
            <IonButton href="/" class="center" shape="round" color="tertiary">
            <IonIcon className="special-icon" icon={arrowBack}/>
                          <span className="recipe-label special-text"> Go back </span>
            </IonButton>
            </IonRow>
            
            
        </form>
        </div>
         </div>
         <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast:false})}
            message={this.state.toastText}
            duration={3000}
            color="danger"
          />
          </IonContent>
         </IonPage>
      )
    }
}

var username = "";
var password = "";
var password2 = "";

const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    username = e.target.value;
 }
 const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    password = e.target.value;
 }
 const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    password2 = e.target.value;
 }

export default Registration;
  