import React from 'react';
import style from './Footer.scss';

const Social = () => (
  <div className={style.social}>
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <button type="button" className="btn btn-social-icon">
          <a
            href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-twitter" />
          </a>
        </button>
      </li>
      <li className="nav-item">
        <button type="button" className="btn btn-social-icon">
          <a
            href="https://www.instagram.com/hotcitiesworld/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-instagram" />
          </a>
        </button>
      </li>
      <li className="nav-item">
        <button type="button" className="btn btn-social-icon">
          <a
            href="https://www.facebook.com/hotcitiesworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-facebook" />
          </a>
        </button>
      </li>
      <li className="nav-item">
        <button type="button" className="btn btn-social-icon">
          <a
            href="https://github.com/bluephlavio/hotcities"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-github" />
          </a>
        </button>
      </li>
    </ul>
  </div>
);

const Footer = () => (
  <footer className={style.footer}>
    <hr />
    <Social />
  </footer>
);

export default Footer;
