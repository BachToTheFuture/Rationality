import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  IonApp,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MainView from './pages/MainView';
import LoginView from './pages/LoginView';
import Registration from './pages/Registration';

import 'bootstrap/dist/css/bootstrap.min.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
/* <Route path="/" render={() => <Redirect to="/main" />} /> */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <Switch>
          <Route path="/main" component={MainView} exact={true}/>
          <Route path="/register" component={Registration} exact={true}/>
          <Route path="/" component={LoginView} exact={true}/>
        </Switch>
    </IonReactRouter>
  </IonApp>
);

export default App;
