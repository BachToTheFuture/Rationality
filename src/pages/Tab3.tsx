import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HelpContainer from '../components/HelpContainer';
import './Tab3.css';


const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonTitle size="large" class="welcome">Good morning,</IonTitle>
        <IonTitle size="large" class="usertitle"><b>BunPillo!</b></IonTitle>
        <HelpContainer/>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
