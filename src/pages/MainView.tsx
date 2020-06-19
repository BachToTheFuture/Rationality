import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
  } from '@ionic/react';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab5 from './Tab5';
import { ellipse, statsChart, fileTray , nutrition, receipt, triangle, calendar, personCircle } from 'ionicons/icons';
import { set, get } from "../storage";

var user_data;

class MainView extends React.Component {

  state = {
    update: 0
  }

  set_login(login) {
    set("login", login);
    user_data = login;
    this.setState({
      update: this.state.update+1
    });
  }
  get_login() {
    get("login").then(content => {
      user_data = content
      this.setState({
        update: this.state.update-1
      });
    })
    return user_data
  }

  render () {
      return (
        <IonPage>
        <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/main/tab1" component={Tab1} exact={true} />
            <Route path="/main/tab2" component={Tab2} exact={true} />
            <Route path="/main/tab3" component={Tab3} exact={true} />
            <Route path="/main/tab4" component={Tab4} exact={true} />
            <Route path="/main/tab5" component={Tab5} exact={true} />
            <Route path="/main" render={() => <Redirect to="/main/tab3" exact />} exact />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/main/tab1">
              <IonIcon icon={calendar} />
              <IonLabel>Calendar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/main/tab2">
              <IonIcon icon={receipt} />
              <IonLabel>Shopping List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/main/tab3">
              <IonIcon icon={personCircle} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/main/tab4">
              <IonIcon icon={nutrition} />
              <IonLabel>Recipes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/main/tab5">
              <IonIcon icon={fileTray} />
              <IonLabel>Inventory</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      </IonPage>
      )
    }
  }
  
export default MainView;