import React from 'react';
import PropTypes from 'prop-types';
import { formatTemp } from '../../helpers/format';
import style from './style.scss';

const Thermometer = ({ temp }) => (
  <span className={style.thermometer}>
    <span className={style.temp}>{formatTemp(temp)}</span>
    <span className={style.meter}>
      <div className={style.level} style={{ width: `${2 * temp}px` }} />
    </span>
  </span>
);

Thermometer.propTypes = {
  temp: PropTypes.number.isRequired
};

export default Thermometer;
