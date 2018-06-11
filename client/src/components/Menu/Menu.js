import React, { Component } from "react";
import './Menu.css';

class Nav extends Component {
  render() {
    return (
      <ul className="navbar-nav menu">
        <li className="nav-item">
          <a className="nav-link" href="/">Live</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/stats">Stats</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/api">API</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">About</a>
        </li>
      </ul>
    );
  }
}

export default Nav;
