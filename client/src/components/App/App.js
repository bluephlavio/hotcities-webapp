import React from 'react';
import { hot } from 'react-hot-loader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.scss';

const App = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default hot(module)(App);
