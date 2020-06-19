import React, { useState } from 'react';
import { IonButton, IonItem, IonCardTitle, IonCardContent, IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel, IonSpinner } from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import './Tab1.css';
import Calendar from 'react-calendar';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';

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

function handleSchedule(uid, date, name) {
  let uri = "https://Rationality--bach5000.repl.co/schedule/"+uid+"/"+date+"/"+name
  fetch(uri).then(response => response.json()).then(content => {
    if (content.success) {
          // Update user data
          console.log(content);
          set("login", content);
      }
  })
  
}

function handleDayChange(value, event) {
  setDate(value);
  // If there is food scheduled for a day...
  
}


var user_data = {}
var list = []

class Tab1 extends React.Component {
  state = {
    loading: 1,
    value: new Date(),
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
          loading: 0
        });
        setDate(new Date()); // Set date to today.
      }
      // This makes it redirect to login.
      else {
        alert("NOT AUTHENTICATED");
        this.setState({
          loading: -1
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
        <IonTitle size="large" class="welcome"><b>Calendar</b></IonTitle>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div>
            <Calendar
              onChange={this.onChange}
              value={value}
              onClickDay={handleDayChange}
              />
          </div>
          <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                  {nice_date_string}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <span className={scheduled_meal?"mealname":"hide"}>
                  You scheduled <b>{scheduled_meal}</b> on this day.
                </span>
                <hr></hr>
                <IonItem>
                  <IonLabel>{scheduled_meal?"Change meal":"Schedule a meal"}</IonLabel>
                  <IonSelect onIonChange={(e:any) => {current_meal = e.target.value} }>
                    {list.map((val, i) => (
                        <IonSelectOption key={i} value={val}>{val}</IonSelectOption>
                    ))}
                  </IonSelect>
              </IonItem>
              <IonButton onClick={(e)=>handleSchedule(user_data["success"]["_id"], current_day, current_meal)} class="center" color="tertiary" shape="round">Schedule</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default Tab1;
