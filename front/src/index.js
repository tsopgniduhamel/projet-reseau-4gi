import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Tickets from './components/Tickets/Tickets';
import {Accueil} from './components/Accueil';
import Notifications from './components/Notifications/Notifications'
import Staff from './components/Staff/Staff'
import Services from './components/Services/Services'
import Navbar from './components/Navbar'
import ProtectedRoute from'./components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ClientRoute from './components/ClientRoute';




render(
  <div>
    
    <Router>
        <Navbar ref="nav"/>
        <PublicRoute exact path="/" component={Accueil}/>
        <ProtectedRoute path="/tickets" component={Tickets}/>
        <ProtectedRoute path="/services" component={Services}/>
        <ProtectedRoute path="/notifications" component={Notifications}/>
        <ProtectedRoute path="/staff" component={Staff}/>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
