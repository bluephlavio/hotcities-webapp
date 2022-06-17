import React from 'react';
import useData from '@/hooks/useData';
import LiveTab from '@/components/LiveTab';
import StatsTab from '@/components/StatsTab';
import Selector from './components/Selector';
import styles from './Panel.module.scss';

const Panel = () => {
  const { focus } = useData();

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Selector focus="live">Live</Selector>
        <Selector focus="stats">Stats</Selector>
      </div>
      <div className={styles.info}>
        {focus === 'live' && <LiveTab />}
        {focus === 'stats' && <StatsTab />}
      </div>
    </div>
  );
};

export default Panel;
