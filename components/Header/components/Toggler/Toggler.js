import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Toggler.module.scss';

const Toggler = ({ toggle }) => (
  <button
    type="button"
    className={`${styles.toggler} d-inline d-md-none`}
    aria-label="toggler"
    onClick={toggle}
  >
    <FontAwesomeIcon icon="bars" fixedWidth />
  </button>
);

export default Toggler;
