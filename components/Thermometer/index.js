import React from 'react';
import PropTypes from 'prop-types';
import { formatTemp } from '../../helpers/format';
import style from './style.scss';

const Thermometer = ({ temp, minTemp, maxTemp, widthFactor }) => (
  <div className={style.thermometer}>
    <span className={style.temp}>{formatTemp(temp)}</span>
    <span className={style.meter} style={{ width: `${widthFactor * 100}%` }}>
      <div
        className={style.level}
        style={{ width: `${((temp - minTemp) / (maxTemp - minTemp)) * 100}%` }}
      />
    </span>
  </div>
);

Thermometer.propTypes = {
  temp: PropTypes.number.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  widthFactor: PropTypes.number
};

Thermometer.defaultProps = {
  widthFactor: 1
};

export default Thermometer;
