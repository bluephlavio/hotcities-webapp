import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

const SocialButton = ({ href, icon }) => (
  <button type="button" className="btn btn-social-icon">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={['fab', icon]} />
    </a>
  </button>
)

const Footer = () => (
  <div className={style.footer}>
    <hr />
    <div className={style.social}>
      <SocialButton href="https://twitter.com/intent/user?screen_name=hotcitiesworld" icon="twitter" />
      <SocialButton href="https://twitter.com/intent/user?screen_name=hotcitiesworld" icon="instagram" />
      <SocialButton href="https://twitter.com/intent/user?screen_name=hotcitiesworld" icon="facebook" />
      <SocialButton href="https://twitter.com/intent/user?screen_name=hotcitiesworld" icon="github" />
    </div>
  </div>
);

export default Footer;