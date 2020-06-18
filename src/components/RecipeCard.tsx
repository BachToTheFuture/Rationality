import React from 'react';
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { people, calendarOutline, heart, heartOutline, speedometer,alarm, wine, warning, walk } from 'ionicons/icons';
import './RecipeCard.css';
import { set, get } from "../storage";

interface RecipeCardProps {
    uid: string;
    name: string;
    time: string;
    diff: string;
    serv: string;
    favorite: boolean;
    pic: boolean;
}

function handleAdd(name, uid) {
    let uri = "https://Rationality--bach5000.repl.co/add/"+uid+"/"+name
    fetch(uri).then(response => response.json()).then(content => {
        console.log(content);
        if (content.success) {
            // Update user data
            set("login", content);
        }
    })
}

const RecipeCard: React.FC<RecipeCardProps> = ({pic, uid, name, time, diff, serv, favorite}) => {
    var src = "https://source.unsplash.com/900x500/?" + name;
    var classes = favorite ? "liked":"";
    // Add "add to my recipes" feature
    return (
            <IonCard className={pic?"subcard":"subcard"}>
                <img alt="" className={pic?"":"hide"} alt-text="image" src={pic?src:""}></img>
                <IonCardHeader>
                    <IonCardTitle><b>{name}</b></IonCardTitle>
                    <span className="vert-align">
                        <a onClick={e=>{handleAdd(name, uid)}}><IonIcon className={classes} icon={favorite?heart:heartOutline}/></a>
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
                    <span className="vert-align">
                        <IonIcon icon={people} />
                        <IonLabel className="recipe-label"> Serves {serv} </IonLabel>
                    </span>
                </IonCardHeader>
            </IonCard>
    );
};

export default RecipeCard;
