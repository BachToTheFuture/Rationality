import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { IonRow, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonItemDivider } from '@ionic/react';
import { ellipse, lockOpen, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';



const LoginView: React.FC = () => (
    <div className="container">
        <img src="assets/logo.png" height="100"></img>
        <IonTitle size="large" class="usertitle"><b>Rationality</b></IonTitle>
        <form onSubmit={handleFormSubmit}>
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
);
  
var username = "";
var password = "";

const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    username = e.target.value;
 }
 const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    password = e.target.value;
 }

async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log([username, password]);

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
};

export default LoginView;
  