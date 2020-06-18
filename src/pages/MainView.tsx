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
import { ellipse, statsChart, nutrition, newspaper, triangle, calendar, personCircle } from 'ionicons/icons';
import { get } from "../storage";

class MainView extends React.Component {
  render () {
      return (
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
            </IonTabButton>
            <IonTabButton tab="tab2" href="/main/tab2">
              <IonIcon icon={newspaper} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/main/tab3">
              <IonIcon icon={personCircle} />
            </IonTabButton>
            <IonTabButton tab="tab4" href="/main/tab4">
              <IonIcon icon={nutrition} />
            </IonTabButton>
            <IonTabButton tab="tab5" href="/main/tab5">
              <IonIcon icon={statsChart} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      )
    }
  }
  
export default MainView;