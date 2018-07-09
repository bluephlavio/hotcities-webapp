import React from 'react';
import { Switch, Route } from 'react-router';
import Cities from '../Cities/Cities';
import Records from '../Records/Records';
import Views from '../Views/Views';
import './Main.css';

const Main = (props) => {
	return (
		<div className="main">
            <Switch>
                <Route exact path="/cities" component={Cities} />
                <Route exact path="/records" component={Records} />
                <Route exact path="/Views" component={Views} />
            </Switch>
        </div>
	);
}

export default Main;