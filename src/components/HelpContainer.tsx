import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { ellipse, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';
import './HelpContainer.css';

const HelpContainer: React.FC = () => {
  return (
    <div>
      <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your profile</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Blah blah some data about yourself
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            Help Directory:
          </IonCardContent>
          <IonItem className="ion-activated">
            <IonIcon icon={calendar} slot="start" />
            <IonLabel> Calendar </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={newspaper} slot="start" />
            <IonLabel>Shopping List</IonLabel>
          </IonItem>

          <IonItem className="ion-activated">
            <IonIcon icon={personCircle} slot="start" />
            <IonLabel>Profile</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={nutrition} slot="start" />
            <IonLabel>Recipes</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={statsChart} slot="start" />
            <IonLabel>Dashboard</IonLabel>
          </IonItem>
        </IonCard>
    </div>
  );
};

export default HelpContainer;
