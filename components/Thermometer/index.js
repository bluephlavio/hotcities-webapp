import React from 'react';
import PropTypes from 'prop-types';
import { formatTemp } from '../../helpers/format';
import theme from '../../style/theme';

const Thermometer = ({ temp, range, widthFactor }) => {
  const { minTemp, maxTemp } = range;
  return (
    <div className="thermometer">
      <span className="temp">{formatTemp(temp)}</span>
      <span className="meter">
        <div className="level" />
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
            width: ${widthFactor * 100}%;
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
            width: ${((temp - minTemp) / (maxTemp - minTemp)) * 100}%;
            justify-content: flex-start;
            background-color: ${theme.palette.accent};
          }
        `}
      </style>
    </div>
  );
};

Thermometer.propTypes = {
  temp: PropTypes.number.isRequired,
  range: PropTypes.shape({
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired
  }).isRequired
};

export default Thermometer;
