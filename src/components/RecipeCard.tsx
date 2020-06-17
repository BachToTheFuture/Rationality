import React from 'react';
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { calendarOutline, heart, heartOutline, speedometer,alarm, wine, warning, walk } from 'ionicons/icons';
import './RecipeCard.css';

interface RecipeCardProps {
    name: string;
    time: string;
    diff: string;
    favorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({name, time, diff, favorite}) => {
    var src = "https://source.unsplash.com/900x500/?" + name;
    var classes = favorite ? "liked":"";
    return (
            <IonCard>
                <img alt="" alt-text="image" src={src}></img>
                <IonCardHeader>
                    <IonCardTitle><b>{name}</b></IonCardTitle>
                    <span className="vert-align">
                        <IonIcon className={classes} icon={favorite?heart:heartOutline}/>
                        <IonLabel className="recipe-label"> {favorite?"In your cookbook":"Add to cookbook"} </IonLabel>
                    </span>
                    <span className="vert-align">
                        <IonIcon icon={alarm}/>
                        <IonLabel className="recipe-label"> {time} </IonLabel>
                    </span>
                    <span className="vert-align">
                        <IonIcon icon={speedometer} />
                        <IonLabel className="recipe-label"> {diff} </IonLabel>
                    </span>
                </IonCardHeader>
            </IonCard>
    );
};

export default RecipeCard;
