import React from 'react';
import { IonToast, IonRow, IonSpinner, IonContent, IonPage, IonTitle, IonButton} from '@ionic/react';
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
    search: 0,
    update: "",
    toastText: "",
    showToast: false,
    queryText: "Showing featured recipes"
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

  getDataInit () {
    get("login").then(data => {
      user_data = data;
      // If user is authenticated
      if (data && data.success) {
        this.featured();
        this.setState({
          loading: 0
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
              // Update data
              data.forEach((x, n)=>{
                if (x.name === name)
                  data[n]["favorite"] = true;
              });
              parent.setState({
                toastText: "Added " + name + " to favorites",
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
              // Update state
              parent.setState({
                update: name
              });
              // Update data
              data.forEach((x, n)=>{
                if (x.name === name)
                  data[n]["favorite"] = false;
              });
              parent.setState({
                toastText: "Removed " + name,
                showToast: true
              });
          }
      })
  }

  handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    query = e.target.value;
  }

  featured = () => {
    this.setState({
      search: 1
    });
    fetch(`https://Rationality--bach5000.repl.co/featured`)
    .then(response => response.json()).then(content => {
      let test = [];
      Object.keys(content).forEach(x=>{
        test.push({
          component: "RecipeCard",
          name: x,
          time: content[x].info.Time,
          diff: content[x].info.Difficulty,
          serv: content[x].info.Servings,
          html: content[x].content,
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

  actualSearch = () => {
    this.setState({
      search: 1
    });
    fetch(`https://Rationality--bach5000.repl.co/search/`+query)
    .then(response => response.json()).then(content => {
      let test = [];
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
        search: 0,
        queryText: `Search results for \"${query}\"`
      });
      // How to turn this into components?
    })
  }

  search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.actualSearch();
  }

  render () {
    // redirect to login.
    console.log(user_data);
    if (this.state.loading === -1) {
      return <Redirect to="/" exact />
    }
    if (this.state.loading === 1) {
      this.getDataInit()
    }
    if (this.state.search === 1) {
      return (
        <IonPage>
        <IonContent>
        <h1 className="welcome"><b>Recipes</b></h1>
          <br></br>
          <IonRow>
              <input placeholder={query} className="textbox" type="text"></input>
          </IonRow>
          <div className="query-text">
            Getting recipes...
          </div>
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
        <h1 className="welcome"><b>Recipes</b></h1>
        <br></br>
          <div>
          <form onSubmit={this.search}>
          <IonRow>
              <input placeholder="Search..." className="textbox" type="text" onChange={this.handleQuery}></input>
          </IonRow>
        </form>
        <div className="query-text">
          {this.state.queryText}
        </div>
        <Accordion defaultActiveKey="0">
          {data.map(block => <RecipeCard parent={this} handleAdd={this.handleAdd} handleRemove={this.handleRemove} pic={true} html={block.html} uid={this.state.loading?"":user_data["success"]["_id"]} key={Math.random()*1000} name={block.name} time={block.time} diff={block.diff} serv={block.serv} favorite={block.favorite}/>)}
        </Accordion>
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

export default Tab4;
