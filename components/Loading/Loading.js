import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Loading.module.scss';

const Loading = () => (
  <div className={styles.loading}>
    <FontAwesomeIcon icon="spinner" spin />
    <span>Loading...</span></div>
);

export default Loading;
