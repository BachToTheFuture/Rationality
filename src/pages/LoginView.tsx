import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { IonRow, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonItemDivider } from '@ionic/react';
import { ellipse, lockOpen, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';

import { set } from "../storage";

class LoginView extends React.Component {
    state = {
      logged_in: false
    }
    setRedirect = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
          alert("Not verified!")
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
         <div>
          {this.renderRedirect()}
          <div className="container">
        <img src="assets/logo.png" height="100"></img>
        <IonTitle size="large" class="usertitle"><b>Rationality</b></IonTitle>
        <form onSubmit={this.setRedirect}>
            <IonRow>
                <input className="textbox" onChange={handleUsername} id="username" type="text" name="username" placeholder="Username"></input>
            </IonRow>
            <IonRow>
            <input className="textbox" onChange={handlePassword} id="password" type="password" name="password" placeholder="Password"></input>
            </IonRow>
            <IonButton type="submit">
                <IonIcon slot="start" icon={lockOpen} />
                Login
            </IonButton>
        </form>
    </div>
         </div>
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
  