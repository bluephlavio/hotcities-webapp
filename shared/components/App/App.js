import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import GA from '../GoogleAnalytics/GoogleAnalytics';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Live from '../Live/Live';
import Stats from '../Stats/Stats';
import Api from '../Api/Api';
import About from '../About/About';
import Login from '../Login/Login';
import style from './App.scss';
import '../../style/index.scss';

const App = () => (
  <div className={style.app}>
    { GA.init() && <GA.RouteTracker /> }
    <div className={style.header}>
      <Header />
    </div>
    <div className={style.main}>
      <Switch>
        <Route exact path="/" component={Live} />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/apidocs" component={Api} />
        <Route exact path="/about" component={About} />
        <Route exact path="/admin/login" component={Login} />
      </Switch>
    </div>
    <div className={style.footer}>
      <Footer />
    </div>
  </div>
);

export default hot(module)(App);
