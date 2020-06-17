import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { calendarOutline, wifi, wine, warning, walk } from 'ionicons/icons';
import './HelpContainer.css';

const HelpContainer: React.FC = () => {
  return (
    <div className="container">
      <strong>Helpful tips/intro go here</strong>
      <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your profile</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Blah blah some data about yourself
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonItem className="ion-activated">
            <IonIcon icon={calendarOutline} slot="start" />
            <IonLabel> Calendar </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={wine} slot="start" />
            <IonLabel>Card Link Item 2</IonLabel>
          </IonItem>

          <IonItem className="ion-activated">
            <IonIcon icon={warning} slot="start" />
            <IonLabel>Card Button Item 1 activated</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={walk} slot="start" />
            <IonLabel>Card Button Item 2</IonLabel>
          </IonItem>
        </IonCard>
    </div>
  );
};

export default HelpContainer;
