import React, { Component } from "react";
import Menu from "../Menu/Menu";
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <nav className="navbar navbar-default navbar-expand-md navbar-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Menu />
          </div>
        </nav>
      </div>
    );
  }
}

export default Footer;
