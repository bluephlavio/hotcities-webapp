import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Header.css';

const Menu = (props) => {
	return (
		<div className="header-menu">
            <ul className="navbar-nav">
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <Link className="nav-link" to="/">Live</Link>
                </li>
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <Link className="nav-link" to="/stats">Stats</Link>
                </li>
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <Link className="nav-link" to="/apidocs">API</Link>
                </li>
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
            </ul>
        </div>
	);
}

class Header extends Component {
	render() {
		return (
			<header className="header">
                <nav className="navbar navbar-expand-md">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">
                            <h1 className="title">
                                HOT CITIES
                            </h1>
                            <h2 className="motto">world's hottest city, now.</h2>
                        </a>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#nav-id"
                        aria-controls="#navId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="fa fa-bars"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="nav-id"
                    >
                        <Menu />
                    </div>
                </nav>
                <hr />
            </header>
		);
	}
}

export default Header;