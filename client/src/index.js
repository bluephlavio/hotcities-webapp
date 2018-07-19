import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome5/css/fontawesome-all.min.css';
import './index.css';

ReactDOM.render(
	<BrowserRouter>
        <App />
    </BrowserRouter>,
	document.getElementById('root'));

registerServiceWorker();