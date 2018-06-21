import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome5/css/fontawesome-all.min.css';
import './index.css';

ReactGA.initialize('UA-55404180-2');

function fireTracking() {
	ReactGA.pageview(window.location.hash);
}

ReactDOM.render(
	<BrowserRouter onUpdate={fireTracking} >
		<App />
	</BrowserRouter>,
	document.getElementById('root'));

registerServiceWorker();