import React from 'react';
import PropTypes from 'prop-types';
import { formatTemp } from '../../helpers/format';
import theme from '../../style/theme';

const Thermometer = ({ temp, minTemp, maxTemp, widthFactor }) => (
  <div className="thermometer">
    <span className="temp">{formatTemp(temp)}</span>
    <span className="meter" style={{ width: `${widthFactor * 100}%` }}>
      <div
        className="level"
        style={{ width: `${((temp - minTemp) / (maxTemp - minTemp)) * 100}%` }}
      />
    </span>
    <style jsx>
      {`
        .thermometer {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .temp {
          flex-wrap: nowrap;
          font-size: 0.8em;
        }
        .meter {
          background: linear-gradient(
            to right,
            ${theme.palette.secondary}ff,
            ${theme.palette.secondary}00
          );
          height: 5px;
          margin-top: 2px;
          border-right: 1px solid ${theme.palette.secondary};
          display: flex;
          align-items: stretch;
        }
        .level {
          justify-content: flex-start;
          background-color: ${theme.palette.accent};
        }
      `}
    </style>
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
