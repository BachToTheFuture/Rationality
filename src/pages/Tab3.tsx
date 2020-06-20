import React from 'react';
import { IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab3.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import { IonSlide, IonSlides, IonToast, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { helpCircle, ellipse, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';
import RecipeCard from '../components/RecipeCard';

import { Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const slideOpts = {
  initialSlide: 0,
  speed: 400
};


var user_data = {}
var list = []

var random_greets = [
  "Hey there,",
  "Hello,",
  "Eat healthy,",
  "Be rational,"
]

class Tab3 extends React.Component {
  state = {
    loading: 1,
    update: "",
    showToast: false,
    toastText: ""
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
          loading: 0,
        });
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
  handleAdd(name, uid, parent) {
    let uri = "https://Rationality--bach5000.repl.co/add"
    fetch(uri,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"uid": uid, "food":name})
  }).then(response => response.json()).then(content => {
        console.log(content);
        if (content.success) {
            // Update user data
            set("login", content);
            // Update user data
            user_data = content;
            // Update state
            parent.setState({
              update: name
            });
            // Update data
            list.forEach((x, n)=>{
              if (x.name === name)
                list[n]["favorite"] = true;
            });
            parent.setState({
              toastText: "Added " + name,
              showToast: true
            });
        }
    })
}

handleRemove(name, uid, parent) {
    let uri = "https://Rationality--bach5000.repl.co/remove"
    fetch(uri,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"uid": uid, "food":name})
  }).then(response => response.json()).then(content => {
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
                list.splice(n,1)
            });
            parent.setState({
              toastText: "Removed " + name,
              showToast: true
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
          <IonTitle size="large" class="welcome">{random_greets[Math.floor(Math.random()*3)]}</IonTitle>
          <IonTitle size="large" class="usertitle"><b>{user_data["success"]["name"]}!</b></IonTitle>
          <div>
          <Card>
                <Card.Header>
                  <IonCardTitle>Welcome!</IonCardTitle>
                </Card.Header>
                <Card.Body className="welcomeslides">
                  <IonSlides pager={true} options={slideOpts}>
                    <IonSlide>
                      <div className="welcome-vert-center">
                        <IonIcon className="special-icon help-icon" icon={helpCircle} />
                        <span className="special-text">Swipe to see some <b>helpful hints</b>!</span>
                      </div>
                      
                    </IonSlide>
                    <IonSlide>
                        You can only schedule meals from your favorites! Double tap the heart on the meal card to add it.
                    </IonSlide>
                    <IonSlide>
                       Add items that you already have in your inventory!
                    </IonSlide>
                    <IonSlide>
                       Items in your shopping list are added automatically when you schedule meals.
                    </IonSlide>
                  </IonSlides>
                </Card.Body>
                <Card.Header>
                <IonButton onClick={this.logout} class="center" href="/" color="tertiary" shape="round">Sign Out</IonButton>
                </Card.Header>
              </Card>
            <Card>
                <Card.Header>
                  <Card.Title>Your favorites</Card.Title>
                </Card.Header>
                <Card.Body>
                <Accordion defaultActiveKey="0">
                {list.map(block => <RecipeCard parent={this} handleAdd={this.handleAdd} handleRemove={this.handleRemove} html={block.html} pic={false} uid={this.state.loading?"":user_data["success"]["_id"]} key={Math.random()*1000} name={block.name} time={block.time} diff={block.diff} serv={block.serv} favorite={block.favorite}/>)}
                </Accordion>
                </Card.Body>
              </Card>
          </div>
          <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({showToast:false})}
            message={this.state.toastText}
            duration={2000}
            color="success"
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default Tab3;
