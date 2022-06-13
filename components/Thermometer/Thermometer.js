import React from 'react';
import { formatTemp } from '@/helpers/format';
import styles from './Thermometer.module.scss';

const Thermometer = ({ temp, temprange, widthFactor }) => {
  const [minTemp, maxTemp] = temprange;
  return (
    <div className={styles.thermometer}>
      <span className={styles.temp}>{formatTemp(temp)}</span>
      <span className={styles.meter} style={{ width: `${widthFactor * 100}%` }}>
        <div
          className={styles.level}
          style={{
            width: `${((temp - minTemp) / (maxTemp - minTemp)) * 100}%`
          }}
        />
      </span>
    </div>
  );
};

export default Thermometer;
