import React, { useState } from 'react';
import { IonItem, IonCardTitle, IonCardContent, IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel, IonSpinner } from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Calendar from 'react-calendar';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';

var current_day = "";
var nice_date_string = "";

function setDate(value) {
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(value)
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(value)
  const mo2 = new Intl.DateTimeFormat('en', { month: 'short' }).format(value)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(value)
  current_day = `${ye}-${mo}-${da}`
  nice_date_string = `${mo2} ${da}, ${ye}`
}

function handleSchedule(name, uid,date) {
  let uri = "https://Rationality--bach5000.repl.co/schedule/"+uid+"/"+name+"/"+date
  fetch(uri).then(response => response.json()).then(content => {
      console.log(content);
      if (content.success) {
          // Update user data
          set("login", content);
      }
  })
}

setDate(new Date()); // Set date to today.

function handleDayChange(value, event) {
  console.log(value)
  setDate(value);
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
        console.log(test);
        list = test;
        this.setState({
          loading: 0
        });
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
                <IonItem>
                <IonLabel>Schedule a meal on this day</IonLabel>
                <IonSelect>
                  {list.map((val, i) => (
                      <IonSelectOption key={i} value={val}>{val}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default Tab1;
