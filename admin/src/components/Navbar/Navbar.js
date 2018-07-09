import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
	return (
		<header className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/admin">Admin</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="fa fa-bars"></span>
            </button>
            <nav
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/cities">Cities</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/records">Records</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/views">Views</Link>
                    </li>
                </ul>
            </nav>
        </header>
	);
}

export default Navbar;