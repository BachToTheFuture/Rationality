import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Calendar from 'react-calendar';

const Tab1: React.FC = () => {
  const [value, onChange] = useState(new Date());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <Calendar
            onChange={onChange}
            value={value}
            />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
