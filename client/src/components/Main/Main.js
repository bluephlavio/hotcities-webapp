import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GA from '../GoogleAnalytics/GoogleAnalytics';
import Live from '../Live/Live';
import Stats from '../Stats/Stats';
import Api from '../Api/Api';
import About from '../About/About';
import './Main.scss';

const Main = () => (
  <div className="main">
    { GA.init() && <GA.RouteTracker /> }
    <Switch>
      <Route exact path="/" component={Live} />
      <Route exact path="/stats" component={Stats} />
      <Route exact path="/apidocs" component={Api} />
      <Route exact path="/about" component={About} />
    </Switch>
  </div>
);

export default Main;
