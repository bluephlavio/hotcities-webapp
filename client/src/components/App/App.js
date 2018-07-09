import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";

const App = (props) => {
	return (
		<div className="app">
            <Header />
            <Main />
            <Footer />
        </div>
	);
}

export default App;