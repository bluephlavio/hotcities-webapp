import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Live from "../Live/Live";
import Stats from "../Stats/Stats";
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path="/" component={Live} />
          <Route exact path="/stats" component={Stats} />
        </Switch>
      </div>
    );
  }
}

export default Main;
