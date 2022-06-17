import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Item.module.scss';

const Item = ({ value, icon }) => (
  <div className={styles.item}>
    <div className={styles.icon}>
      <FontAwesomeIcon icon={icon} fixedWidth />
    </div>
    <span className={styles.value}>{value}</span>
  </div>
);

export default Item;
