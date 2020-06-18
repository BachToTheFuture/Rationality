import React from 'react';
import { IonRow, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
import './Tab4.css';
import { set, get } from "../storage";
import { Redirect } from 'react-router-dom';
import { Button, Accordion, Card } from 'react-bootstrap';


import '../components/RecipeList.css';
import RecipeCard from '../components/RecipeCard';
import 'bootstrap/dist/css/bootstrap.min.css';


var user_data = {}
var query = "";
var data = [];

class Tab4 extends React.Component {
  state = {
    loading: 1,
    search: 0
  }
  getData () {
    get("login").then(data => {
      user_data = data;
      // If user is authenticated
      if (data && data.success) {
        this.setState({
          loading: 0
        });
      }
      // This makes it redirect to login.
      else {
        this.setState({
          loading: -1
        });
      }
    })
  }

  handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    query = e.target.value;
  }
  search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      search: 1
    });
    fetch(`https://Rationality--bach5000.repl.co/search/`+query)
    .then(response => response.json()).then(content => {
      console.log(content);
      let test = [];
      console.log(user_data["success"]["recipes"])
      Object.keys(content).forEach(x=>{
        test.push({
          component: "RecipeCard",
          name: x,
          time: content[x].data.info.Time,
          diff: content[x].data.info.Difficulty,
          serv: content[x].data.info.Servings,
          html: content[x].data.content,
          favorite: (x in user_data["success"]["recipes"]),
        });
      });
      data = test;
      this.setState({
        search: 0
      });
      // How to turn this into components?
    })
  }

  render () {
    // redirect to login.
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
    if (this.state.search === 1) {
      return (
        <IonPage>
        <IonContent>
          <IonTitle size="large" class="welcome"><b>Recipes</b></IonTitle>
          <br></br>
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
        <IonTitle size="large" class="welcome"><b>Recipes</b></IonTitle>
        <br></br>
          <div>
          <form onSubmit={this.search}>
          <IonRow>
              <input placeholder="Search..." className="textbox" type="text" onChange={this.handleQuery}></input>
          </IonRow>
        </form>
        <Accordion defaultActiveKey="0">
          {data.map(block => <RecipeCard pic={true} html={block.html} uid={this.state.loading?"":user_data["success"]["_id"]} key={Math.random()*1000} name={block.name} time={block.time} diff={block.diff} serv={block.serv} favorite={block.favorite}/>)}
        </Accordion>
        </div>
      </IonContent>
    </IonPage>
    );
  }
}

export default Tab4;
