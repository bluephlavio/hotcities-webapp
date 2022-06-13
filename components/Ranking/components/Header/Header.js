import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

const Header = ({ title, selected, onClick }) => (
  <th onClick={onClick}>
    <div className={styles.header}>
      <FontAwesomeIcon icon={[selected ? 'fas' : 'far', 'circle']} />
      <span className={styles.sep} />
      <span className={styles.title}>{title}</span>
    </div>
  </th>
);

export default Header;
