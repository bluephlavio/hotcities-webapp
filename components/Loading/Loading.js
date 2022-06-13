import React from 'react';
import styles from './Loading.module.scss';

const Loading = ({ children }) => (
  <div className={styles.loading}>{children}</div>
);

export default Loading;
