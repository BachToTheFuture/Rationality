import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, } from '@ionic/react';
import HelpContainer from '../components/HelpContainer';
import { star } from 'ionicons/icons';
import './Tab3.css';


const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonTitle size="large" class="welcome">Good morning,</IonTitle>
        <IonTitle size="large" class="usertitle"><b>BunPillo!</b></IonTitle>
        <HelpContainer/>
  
        {/*-- Anchor --*/}
        <IonButton class="center" href="#" color="tertiary" shape="round">Sign Out</IonButton>
      </IonContent>
    </IonPage>
  );
};




export default Tab3;
