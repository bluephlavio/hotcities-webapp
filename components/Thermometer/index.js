import React from 'react';
import PropTypes from 'prop-types';
import { formatTemp } from '../../helpers/format';
import style from './style.scss';

const Thermometer = ({ temp }) => (
  <span className={style.thermometer}>
    <h3 className={style.temp}>{formatTemp(temp)}</h3>
    <span className={style.meter}>
      <div className={style.level} style={{ width: `${2 * temp}px` }} />
    </span>
  </span>
);

Thermometer.propTypes = {
  temp: PropTypes.number.isRequired
};

export default Thermometer;
