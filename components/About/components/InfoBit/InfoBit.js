import React from 'react';
import styles from './InfoBit.module.scss';

const InfoBit = ({ section, children }) => (
  <p className={styles.infobit}>
    <b>{`${section}. `}</b>
    {children}
  </p>
);

export default InfoBit;
