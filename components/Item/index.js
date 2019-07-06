import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

const Item = ({ value, icon }) => {
  return (
    <div className={style.item}>
      <span className={style.value}>{value}</span>
      <FontAwesomeIcon icon={icon} fixedWidth className={style.icon} />
    </div>
  );
};

Item.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired
};

export default Item;
