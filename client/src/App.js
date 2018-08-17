import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Main from './components/Main/Main';

const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

export default hot(module)(App);
