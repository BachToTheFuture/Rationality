import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox, IonList, IonItem, IonLabel, IonItemDivider  } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const checkboxList = [
  { val: 'Pepperoni', isChecked: false },
  { val: 'Sausage', isChecked: false },
  { val: 'Mushroom', isChecked: false },
  { val: 'Bread', isChecked: false }
];

export const Tab2: React.FC = () => {

  const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopping List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemDivider>For: June[x] - June[x]</IonItemDivider>
          {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
              <IonLabel>{val}</IonLabel>
              <IonCheckbox slot="end" color="secondary" value={val} checked={isChecked} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

/*const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};
*/

export default Tab2;
