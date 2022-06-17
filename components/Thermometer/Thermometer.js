import React from 'react';
import classNames from 'classnames';
import useLevel from '@/hooks/useLevel';
import styles from './Thermometer.module.scss';

const Thermometer = ({ className, ...rest }) => {
  const level = useLevel();

  return (
    <div className={classNames({ className }, styles.container)} {...rest}>
      <span className={styles.meter}>
        <span
          className={styles.level}
          style={{
            width: `${level * 100}%`,
          }}
        />
      </span>
    </div>
  );
};

export default Thermometer;
