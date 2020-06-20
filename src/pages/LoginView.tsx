import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { IonToast, IonRow, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonItemDivider } from '@ionic/react';
import { personAdd, ellipse, lockOpen, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';

import { set } from "../storage";
import "./LoginView.css";

class LoginView extends React.Component {
    state = {
      logged_in: false,
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
        body: JSON.stringify({'form': {'username': username, 'password':password}})
      }).then(response => response.json()).then(content => {
        console.log(content);
        if (content.success) {
          set("login", content);
          this.setState({
            logged_in: true
          });
        }
        else {
          this.setState({
            toastText: "Incorrect username or password",
            showToast: true
          });
        }
      })
    }
    renderRedirect = () => {
      if (this.state.logged_in) {
        return <Redirect to='/main' exact/>
      }
    }
    render () {
      return (
        <IonPage>
          <IonContent>
         <div>
          {this.renderRedirect()}
          <div className="container">
        <img className="logo" src="assets/Rationality.png" height="60"></img>
        <form>
            <IonRow>
                <input className="textbox" onChange={handleUsername} id="username" type="text" name="username" placeholder="Username"></input>
            </IonRow>
            <IonRow>
            <input className="textbox" onChange={handlePassword} id="password" type="password" name="password" placeholder="Password"></input>
            </IonRow>
            <IonRow>
              <IonButton onClick={this.setRedirect} class="center" shape="round">
                <IonIcon className="special-icon" icon={lockOpen}/>
                <span className="recipe-label special-text"> Login </span>
              </IonButton>
              <IonButton href="/register" class="center" shape="round" color="tertiary">
                <IonIcon className="special-icon" icon={personAdd}/>
                <span className="recipe-label special-text"> Register </span>
              </IonButton>
            </IonRow>
            
            
        </form>
        </div>
         </div>
         <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast:false})}
            message={this.state.toastText}
            duration={1000}
            color="danger"
          />
          </IonContent>
         </IonPage>
      )
    }
}

var username = "";
var password = "";

const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    username = e.target.value;
 }
 const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    password = e.target.value;
 }

async function handleFormSubmit(e: React.ChangeEvent<HTMLInputElement>) {
  e.preventDefault();
  const response = await fetch(`https://Rationality--bach5000.repl.co/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'form': {'username': username, 'password':password}})
    });
    const content = await response.json();
    console.log(content);
    return content;
};

export default LoginView;
  