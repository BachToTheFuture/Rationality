import React from 'react';
import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { calendarOutline, heartOutline, alarm, wine, warning, walk } from 'ionicons/icons';

import './RecipeList.css';
import RecipeCard from './RecipeCard';

// <RecipeCard name="Boba" time="30 min" diff="Easy" favorite={true}/>

var query = "";
var data = [];

class RecipeList extends React.Component {
  state = {
    search: 0
  }
  handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    query = e.target.value;
  }
  search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://Rationality--bach5000.repl.co/search/`+query)
    .then(response => response.json()).then(content => {
      console.log(content);
      data = [
        {
          component: "RecipeCard",
          name: "Boba",
          time: "30 min",
          diff: "Easy",
          favorite: true,
        }
      ]
      this.setState({
        search: this.state.search ? 1 : 0
      });
      // How to turn this into components?
    })
  }
  render () {
    console.log("Render")
    return (
      <div>
        <form onSubmit={this.search}>
        <input placeholder="Search..." className="textbox" type="text" onChange={this.handleQuery}></input>
      </form>
        {data.map(block => <RecipeCard name={block.name} time={block.time} diff={block.diff} favorite={block.favorite}/>)}
      </div>
    )
  }
}

export default RecipeList;
