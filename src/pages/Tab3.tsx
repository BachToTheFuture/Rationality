import React from 'react';
import { IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab3.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { ellipse, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';
import RecipeCard from '../components/RecipeCard';

import { Button, Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

var user_data = {}
var list = []

class Tab3 extends React.Component {
  state = {
    loading: 1,
    update: ""
  }
  componentDidUpdate(prevProps) {
    if (this.props["location"] !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.getData()
    this.setState({
      loading: 2 + Math.random()
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
          test.push({
            component: "RecipeCard",
            name: x,
            time: content[x].info.Time,
            diff: content[x].info.Difficulty,
            serv: content[x].info.Servings,
            html: content[x].content,
            favorite: true,
          });
        });
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
  handleAdd(name, uid, parent) {
    let uri = "https://Rationality--bach5000.repl.co/add/"+uid+"/"+name
    fetch(uri).then(response => response.json()).then(content => {
      console.log(content);
      if (content.success) {
          // Update user data
          set("login", content);
          // Update user data
          user_data = content;
          console.log("ADDED")
          // Update state
          parent.setState({
            update: name
          });
          // Update data
          list.forEach((x, n)=>{
            if (x.name === name)
              list[n]["favorite"] = true;
          });
      }
    })
  }

  handleRemove(name, uid, parent) {
      let uri = "https://Rationality--bach5000.repl.co/remove/"+uid+"/"+name
      fetch(uri).then(response => response.json()).then(content => {
        console.log(content);
        if (content.success) {
            // Update user data
            set("login", content);
            // Update user data
            user_data = content;
            console.log("REMOVED")
            // Update state
            parent.setState({
              update: name
            });
            // Update data
            list.forEach((x, n)=>{
              if (x.name === name)
                list[n]["favorite"] = false;
            });
        }
      })
  }

  logout () {
    // Reset stuff
    set("login", {});
  }

  render () {
    // redirect to login.
    console.log("DATA STUFF")
    console.log(list);
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
          <IonTitle size="large" class="welcome">Hey there,</IonTitle>
          <IonTitle size="large" class="usertitle"><b>{user_data["success"]["name"]}!</b></IonTitle>
          <div>
          <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Your Profile</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Blah some user content/data here...
                  <IonButton onClick={this.logout} class="center" href="/" color="tertiary" shape="round">Sign Out</IonButton>
                </IonCardContent>
              </IonCard>
            <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Your favorites</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                <Accordion defaultActiveKey="0">
                {list.map(block => <RecipeCard parent={this} handleAdd={this.handleAdd} handleRemove={this.handleRemove} html={block.html} pic={false} uid={this.state.loading?"":user_data["success"]["_id"]} key={Math.random()*1000} name={block.name} time={block.time} diff={block.diff} serv={block.serv} favorite={block.favorite}/>)}
                </Accordion>
                </IonCardContent>
              </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Tab3;
