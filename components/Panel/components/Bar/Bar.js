import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Bar.module.scss';

const Bar = ({
  title, toggle, icon, isLoading, ...rest
}) => (
  <div className={styles.bar} {...rest}>
    <div className={styles.title}>{title}</div>
    <button type="button" onClick={toggle} aria-label="expand">
      <FontAwesomeIcon icon={icon} spin={isLoading} fixedWidth />
    </button>
  </div>
);

export default Bar;
