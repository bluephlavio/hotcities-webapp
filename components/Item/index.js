import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

const Item = ({ value, icon }) => {
  return (
    <div className={style.item}>
      <FontAwesomeIcon icon={icon} fixedWidth className={style.icon} />
      <span className={style.value}>{value}</span>
    </div>
  );
};

Item.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Item;
