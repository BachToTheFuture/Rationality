import React, { useState } from 'react';
import { IonIcon, IonToast, IonButton, IonItem, IonCardTitle, IonCardContent, IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel, IonSpinner } from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import './Tab1.css';
import Calendar from 'react-calendar';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { calendar } from 'ionicons/icons';

var current_day = "";
var nice_date_string = "";
var current_meal = "";

var scheduled_meal = false;

function setDate(value) {
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(value)
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(value)
  const mo2 = new Intl.DateTimeFormat('en', { month: 'short' }).format(value)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(value)
  current_day = `${ye}-${mo}-${da}`
  nice_date_string = `${mo2} ${da}, ${ye}`

  if (user_data) console.log(user_data);

  if (user_data && user_data["success"]["schedule"][current_day]) {
    scheduled_meal = user_data["success"]["schedule"][current_day]
  }
  else {
    scheduled_meal = false;
  }
}

function handleDayChange(value, event) {
  setDate(value);
}


var user_data = {}
var list = []

class Tab1 extends React.Component {
  state = {
    loading: 1,
    value: new Date(),
    showToast : false,
    toastText : ""
  }

  handleSchedule(uid, date, name) {
    console.log(current_day);
    let old_day = current_day;
    this.setState({
      loading: 1
    });
    let uri = "https://Rationality--bach5000.repl.co/schedule"
    fetch(uri,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"uid": uid, "date":date, "food":name})
    }).then(response => response.json()).then(content => {
      if (content.success) {
            // Update user data
            set("login", content);
            user_data = content;
            content = content["success"]["recipes"];
            let test = [];
            Object.keys(content).forEach(x=>{
              test.push(x);
            });
            list = test;
            this.setState({
              loading: 0,
              showToast: true,
              toastText: "Scheduled " + name+" for " + old_day
            });
            current_day = old_day;
            console.log(current_day);
        }
    })
    
  }

  componentDidUpdate(prevProps) {
    if (this.props["location"] !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({
      loading: 1
    })
  }

  getData () {
    get("login").then(data => {
      user_data = data;
      // If user is authenticated
      if (data && data.success) {
        let content = data["success"]["recipes"];
        let test = [];
        Object.keys(content).forEach(x=>{
          test.push(x);
        });
        list = test;
        this.setState({
          loading: 0,
          value: new Date()
        });
        setDate(new Date()); // Set date to today.
      }
      // This makes it redirect to login.
      else {
        this.setState({
          loading: -1,
          toastText: "You are not authorized.",
          showToast: true
        });
      }
    })
  }
  
  onChange = value => this.setState({ value })

  render () {
    const { value } = this.state;
    if (this.state.loading === -1) {
      return <Redirect to="/" exact />
    }
    if (this.state.loading === 1) {
      return (
        <IonPage>
          {this.getData()}
        <IonContent>
          <div className="container">
            <IonSpinner className="big-spinner" name="crescent" />
          </div>
        </IonContent>
      </IonPage>
      )
    }
    return (
      <IonPage>
        <IonContent>
        <h1 className="welcome"><b>Calendar</b></h1>
          <div>
            <Calendar
              onChange={this.onChange}
              value={value}
              onClickDay={handleDayChange}
              />
          </div>
          <IonCard>
            <Card.Header>
                <IonCardTitle>
                  {nice_date_string}
                </IonCardTitle>
            </Card.Header>
            <Card.Body>
              <div className={scheduled_meal?"mealname":"hide"}>
                <span>
                    You scheduled <b>{scheduled_meal}</b> on this day.
                </span>
                <hr></hr>
              </div>
                <IonItem>
                  <IonLabel>{scheduled_meal?"Change meal":"Schedule a meal"}</IonLabel>
                  <IonSelect onIonChange={(e:any) => {current_meal = e.target.value} }>
                    {list.map((val, i) => (
                        <IonSelectOption key={i} value={val}>{val}</IonSelectOption>
                    ))}
                  </IonSelect>
              </IonItem>
              <IonButton onClick={(e)=>this.handleSchedule(user_data["success"]["_id"], current_day, current_meal)} class="center" color="tertiary" shape="round">
                
              <IonIcon className="special-icon" icon={calendar}/>
              <span className="recipe-label special-text"> Schedule </span>
              </IonButton>
            </Card.Body>
          </IonCard>
          <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast:false})}
            message={this.state.toastText}
            duration={4000}
            color="success"
          />
          </IonContent>
      </IonPage>
    );
  }
}

export default Tab1;
