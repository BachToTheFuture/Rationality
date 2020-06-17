import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonItemDivider } from '@ionic/react';

const LoginView: React.FC = () => (
    <div className="container">
        <img src="assets/logo.png" height="100"></img>
        <IonTitle size="large" class="usertitle"><b>Rationality</b></IonTitle>
        <IonInput placeholder="Username" clearInput></IonInput>
        <IonInput placeholder="Password" clearInput></IonInput>
    </div>
);
  
export default LoginView;
  