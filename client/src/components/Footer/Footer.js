import React from 'react';
import './Footer.scss';

const Social = props => (
  <div className="footer-social">
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <button className="btn btn-social-icon">
          <a href="https://twitter.com/intent/user?screen_name=hotcitiesworld" target="_blank" rel="noopener noreferrer">
            <span className="fab fa-twitter" />
          </a>
        </button>
      </li>
      <li className="nav-item">
        <button className="btn btn-social-icon">
          <a href="https://www.instagram.com/hotcitiesworld/" target="_blank" rel="noopener noreferrer">
            <span className="fab fa-instagram" />
          </a>
        </button>
      </li>
      <li className="nav-item">
        <button className="btn btn-social-icon">
          <a href="https://www.facebook.com/hotcitiesworld" target="_blank" rel="noopener noreferrer">
            <span className="fab fa-facebook" />
          </a>
        </button>
      </li>
      <li className="nav-item">
        <button className="btn btn-social-icon">
          <a href="https://github.com/bluephlavio/hotcities" target="_blank" rel="noopener noreferrer">
            <span className="fab fa-github" />
          </a>
        </button>
      </li>
    </ul>
  </div>
);

const Footer = props => (
  <footer className="footer">
    <hr />
    <Social />
  </footer>
);

export default Footer;
