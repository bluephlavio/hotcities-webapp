import React from 'react';
import styles from './Details.module.scss';

const Details = ({ children }) => (
  <div className={styles.details}>{children}</div>
);

export default Details;
