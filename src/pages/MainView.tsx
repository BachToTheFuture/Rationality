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

const MainView: React.FC = () => (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tab1" component={Tab1} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/tab3" component={Tab3} exact={true} />
            <Route path="/tab4" component={Tab4} exact={true} />
            <Route path="/tab5" component={Tab5} exact={true} />
            <Route path="/main" render={() => <Redirect to="/tab3" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={calendar} />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={newspaper} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={personCircle} />
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4">
              <IonIcon icon={nutrition} />
            </IonTabButton>
            <IonTabButton tab="tab5" href="/tab5">
              <IonIcon icon={statsChart} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
  );
  
  export default MainView;