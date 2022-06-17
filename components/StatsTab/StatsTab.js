import React from 'react';
import Ranking from '@/components/Ranking';
import styles from './StatsTab.module.scss';

const StatsTab = () => {
  return (
    <div className={styles.container}>
      <h1>All time Stats</h1>
      <Ranking />
    </div>
  );
};

export default StatsTab;
