import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import { IonContent, IonSearchbar, IonThumbnail, IonImg, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { eye, people, calendarOutline, heart, heartOutline, speedometer,alarm, wine, warning, walk } from 'ionicons/icons';
import './RecipeCard.css';
import { set, get } from "../storage";

import { Button, Accordion, Card } from 'react-bootstrap';
import ImageFadeIn from "react-image-fade-in";

// To safely render the recipe
import sanitizeHtml from "sanitize-html"
import { Redirect } from 'react-router-dom';
const defaultOptions = {
  allowedTags: [ 'b', 'i', 'li', 'h2', 'h1', 'h3', 'h4', 'h5', 'p', 'div', 'em', 'strong', 'a' ],
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
    var classes = favorite ? "liked special-icon":"special-icon";
    // Add "add to my recipes" feature
    var div_classes = pic?"img-container":"img-container hide"

    var stuff_classes = time?"":"hide"
    return (
        // Find a way to refresh
        <Card className={pic?"subcard":"subcard"}>
          <ImageFadeIn src={pic?src:""} height={250} />
            
                
            <div className="card-stuff">
            <b className="cardtitle">{name}</b>
                <br></br>

                <a onClick={e=>{favorite?handleRemove(name, uid, parent):handleAdd(name, uid, parent)}}><IonIcon className={classes} icon={favorite?heart:heartOutline}/></a>
                <span className="recipe-label special-text"> {favorite?"In your favorites":"Add to favorites"} </span>

                <Accordion.Toggle as="span" eventKey={name}>
                    <IonIcon className="special-icon" icon={eye}/>
                    <span className="recipe-label special-text"> Toggle recipe </span>
                </Accordion.Toggle>
            </div>
            
            <Accordion.Collapse eventKey={name}>
                <Card.Body>
                    <div className={stuff_classes}>
                        <IonIcon className="special-icon" icon={alarm}/>
                        <span className="recipe-label special-text"> {time} </span>
                        <br></br>
                        <IonIcon className="special-icon" icon={speedometer} />
                        <span className="recipe-label special-text"> {diff} </span>
                        <br></br>
                        <IonIcon className="special-icon" icon={people} />
                        <span className="recipe-label special-text"> Serves {serv} </span>

                        <hr></hr>
                    </div>
                    <SanitizeHTML html={html} />
                </Card.Body>
            </Accordion.Collapse>
          </Card>
    );
};

export default RecipeCard;
