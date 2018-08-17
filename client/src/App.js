import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Main from './components/Main/Main';

const App = () => (
  <div className="app">
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </div>
);

export default hot(module)(App);
