import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Bar.module.scss';

const Bar = ({ title, toggle, icon, isLoading }) => (
  <div className={styles.bar}>
    <div className={styles.title}>{title}</div>
    <button type="button" onClick={toggle} aria-label="expand">
      <FontAwesomeIcon icon={icon} spin={isLoading} fixedWidth />
    </button>
  </div>
);

export default Bar;
