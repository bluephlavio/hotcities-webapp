import React, {Component} from "react";
import Social from "../Social/Social";
import Menu from '../Menu/Menu';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md">
          <a href="/" className="navbar-brand">
            <h1 className="title">
              HOT CITIES
            </h1>
            <h2 className="motto text-muted">world.hottest.city.now</h2>
          </a>
          <button className="navbar-toggler"
            type="button" data-toggle="collapse" data-target="#navId"
            aria-controls="#navId" aria-expanded="false" aria-label="Toggle navigation">
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navId">
            <Menu />
            <Social />
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
