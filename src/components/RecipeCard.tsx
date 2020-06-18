import React from 'react';
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { people, calendarOutline, heart, heartOutline, speedometer,alarm, wine, warning, walk } from 'ionicons/icons';
import './RecipeCard.css';
import { set, get } from "../storage";

import { Button, Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// To safely render the recipe
import sanitizeHtml from "sanitize-html"
const defaultOptions = {
  allowedTags: [ 'b', 'i', 'li', 'h2', 'p', 'div', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
};

const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(
    dirty, 
    { ...defaultOptions, ...options }
  )
});

const SanitizeHTML = ({ html }) => (
  <div dangerouslySetInnerHTML={sanitize(html, defaultOptions)} />
);


interface RecipeCardProps {
    uid: string;
    name: string;
    time: string;
    diff: string;
    serv: string;
    favorite: boolean;
    pic: boolean;
    html?: string;
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

const RecipeCard: React.FC<RecipeCardProps> = ({pic, uid, name, time, diff, serv, favorite, html}) => {
    var src = "https://source.unsplash.com/900x500/?" + name;
    var classes = favorite ? "liked":"";
    // Add "add to my recipes" feature
    return (

        <Card className={pic?"subcard":"subcard"}>
            <img alt="" className={pic?"":"hide"} alt-text="image" src={pic?src:""}></img>
            <Accordion.Toggle as={Button} eventKey={name}>
            
                <b className="cardtitle">{name}</b>
                <br></br>
              <span className="vert-align">
                <a onClick={e=>{handleAdd(name, uid)}}><IonIcon className={classes} icon={favorite?heart:heartOutline}/></a>
                <IonLabel className="recipe-label"> {favorite?"In your cookbook":"Add to cookbook"} </IonLabel>
            </span>
            
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={name}>
                <Card.Body>
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
                <hr></hr>
                <SanitizeHTML html={html} />
                </Card.Body>
            </Accordion.Collapse>
          </Card>
    );
};

export default RecipeCard;
