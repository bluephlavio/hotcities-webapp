import React, { Component } from "react";
import './Social.css';

class Social extends Component {
  render() {
    return (
      <ul className="navbar-nav social">
        <li className="nav-item">
          <a className="btn btn-social-icon">
            <span className="fa fa-twitter"></span>
          </a>
        </li>
        <li className="nav-item">
          <a className="btn btn-social-icon">
            <span className="fa fa-github"></span>
          </a>
        </li>
      </ul>
    );
  }
}

export default Social;
