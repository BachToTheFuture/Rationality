import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { eye, people, calendarOutline, heart, heartOutline, speedometer,alarm, wine, warning, walk } from 'ionicons/icons';
import './RecipeCard.css';
import { set, get } from "../storage";

import { Button, Accordion, Card } from 'react-bootstrap';

// To safely render the recipe
import sanitizeHtml from "sanitize-html"
import { Redirect } from 'react-router-dom';
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
    handleAdd: any;
    handleRemove: any;
    parent?: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({handleAdd, parent, handleRemove, pic, uid, name, time, diff, serv, favorite, html}) => {
    var src = "https://source.unsplash.com/900x500/?" + name;
    var classes = favorite ? "liked":"";
    // Add "add to my recipes" feature

    return (
        // Find a way to refresh
        <Card className={pic?"subcard":"subcard"}>
            <img alt="" className={pic?"":"hide"} alt-text="image" src={pic?src:""}></img>
            <div className="card-stuff">
            <b className="cardtitle">{name}</b>
                <br></br>
              <span className="vert-align">
                <a onClick={e=>{favorite?handleRemove(name, uid, parent):handleAdd(name, uid, parent)}}><IonIcon className={classes} icon={favorite?heart:heartOutline}/></a>
                <IonLabel className="recipe-label"> {favorite?"In your cookbook":"Add to cookbook"} </IonLabel>
                </span>
                <span className="vert-align">
                <Accordion.Toggle as="span" eventKey={name}>
                    <IonIcon icon={eye}/>
                    <IonLabel className="recipe-label"> Toggle recipe </IonLabel>
                </Accordion.Toggle>
                </span>
            </div>
            


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
