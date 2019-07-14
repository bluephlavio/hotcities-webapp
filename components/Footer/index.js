import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../style/theme';

const SocialButton = ({ href, icon, label }) => (
  <button type="button" aria-label={label}>
    <a href={href} target="_blank" rel="noopener noreferrer">
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
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const Footer = () => (
  <div className="footer">
    <hr />
    <div className="social">
      <SocialButton
        href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
        icon="twitter"
        label="twitter"
      />
      <SocialButton
        href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
        icon="instagram"
        label="instagram"
      />
      <SocialButton
        href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
        icon="facebook"
        label="facebook"
      />
      <SocialButton
        href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
        icon="github"
        label="github"
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
