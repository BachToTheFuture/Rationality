import React from 'react';
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { calendarOutline, alarm, wine, warning, walk } from 'ionicons/icons';

import './RecipeList.css';
import RecipeCard from './RecipeCard';

const RecipeList: React.FC = () => {
  return (
    <div>
        <IonSearchbar value="hi"></IonSearchbar>
        <RecipeCard name="Boba" time="30 min" diff="Easy"/>
        <RecipeCard name="Fried Rice" time="30 min" diff="Easy"/>
        <RecipeCard name="Cake" time="30 min" diff="Easy"/>
    </div>
  );
};

export default RecipeList;
