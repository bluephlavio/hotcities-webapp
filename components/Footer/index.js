import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../style/theme';

const SocialButton = ({ href, icon }) => (
  <button type="button" aria-label={icon}>
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={icon}>
      <FontAwesomeIcon icon={['fab', icon]} />
    </a>
    <style jsx>
      {`
        button {
          font-size: 1.1em;
          padding: 5px 10px;
          margin: 2px;
        }
      `}
    </style>
  </button>
);

SocialButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

const Footer = () => (
  <div className="footer">
    <hr />
    <div className="social">
      <SocialButton
        href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
        icon="twitter"
      />
      <SocialButton
        href="https://www.instagram.com/hotcitiesworld"
        icon="instagram"
      />
      <SocialButton
        href="https://www.facebook.com/hotcitiesworld"
        icon="facebook"
      />
      <SocialButton
        href="https://github.com/bluephlavio/hotcities-webapp"
        icon="github"
      />
    </div>
    <style jsx>
      {`
        .footer {
          background-color: ${theme.palette.primary};
          color: ${theme.palette.accent};
        }

        .social {
          text-align: center;
          margin: 0;
          border: 0;
          padding: ${theme.dim.padding};
        }
      `}
    </style>
  </div>
);

export default Footer;
