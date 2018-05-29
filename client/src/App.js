import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LiveRecordInfo from './components/LiveRecordInfo/LiveRecordInfo';

class App extends Component {
  render() {
    return ( <
      div className = "App" >
        <header>
          <h1> HOTCITIES </h1>
          <p>w o r l d . h o t t e s t . c i t y . n o w</p>
        </header>
        <LiveRecordInfo />
      </div>
    );
  }
}

export default App;
