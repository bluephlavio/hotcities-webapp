import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
                <Navbar />
                <Main />
            </div>
		);
	}
}

export default App;