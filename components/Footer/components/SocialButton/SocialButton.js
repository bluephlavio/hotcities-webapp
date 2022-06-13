import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SocialButton.module.scss';

const SocialButton = ({ href, icon }) => (
  <button type="button" aria-label={icon} className={styles.socialbutton}>
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={icon}>
      <FontAwesomeIcon icon={['fab', icon]} />
    </a>
  </button>
);

export default SocialButton;
