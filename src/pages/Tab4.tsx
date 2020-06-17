import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RecipeList from '../components/RecipeList';
import './Tab4.css';


const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonTitle size="large" class="welcome"><b>Recipes</b></IonTitle>
        <br></br>
        <RecipeList/>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
