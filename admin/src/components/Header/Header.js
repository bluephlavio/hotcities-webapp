import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = props => (
  <div className="header">
    <div className="container-fluid">
      <header className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/admin"><h1>Admin</h1></a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars" />
        </button>
        <nav
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/cities">Cities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/records">Records</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/views">Views</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/auth/logout">Logout</a>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  </div>
);

export default Header;
