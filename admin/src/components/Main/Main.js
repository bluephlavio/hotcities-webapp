import React from 'react';
import { Switch, Route } from 'react-router';
import Welcome from '../Welcome/Welcome';
import Cities from '../Cities/Cities';
import Records from '../Records/Records';
import Views from '../Views/Views';
import './Main.css';

const Main = (props) => {
	return (
		<div className="main">
            <Switch>
                <Route exact path="/admin" component={Welcome} />
                <Route exact path="/admin/cities" component={Cities} />
                <Route exact path="/admin/records" component={Records} />
                <Route exact path="/admin/views" component={Views} />
            </Switch>
        </div>
	);
}

export default Main;