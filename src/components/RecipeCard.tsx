import React from 'react';
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { calendarOutline, speedometer,alarm, wine, warning, walk } from 'ionicons/icons';
import './RecipeCard.css';

interface RecipeCardProps {
    name: string;
    time: string;
    diff: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({name, time, diff}) => {
    var src = "https://source.unsplash.com/900x500/?" + name;
    return (
            <IonCard>
                <img src={src}></img>
                <IonCardHeader>
                    <IonCardTitle><b>{name}</b></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <span className="vert-align">
                        <IonIcon icon={alarm} slot="start" />
                        <IonLabel className="recipe-label"> {time} </IonLabel>
                    </span>
                    <span className="vert-align">
                        <IonIcon icon={speedometer} slot="start" />
                        <IonLabel className="recipe-label"> {diff} </IonLabel>
                    </span>
                </IonCardContent>
            </IonCard>
    );
};

export default RecipeCard;
