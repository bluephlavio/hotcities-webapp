import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

const Header = ({ title, selected, onClick }) => (
  <th onClick={onClick} className={styles.header}>
    <button type="button">
      <FontAwesomeIcon icon={[selected ? 'fas' : 'far', 'circle']} />
      <span className={styles.title}>{title}</span>
    </button>
  </th>
);

export default Header;
