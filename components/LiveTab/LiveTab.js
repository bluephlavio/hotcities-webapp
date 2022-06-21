import React from 'react';
import useData from '@/hooks/useData';
import { formatNames, formatTemp, formatPopulation, formatCountry, formatCoords, formatRank } from '@/helpers/format';
import Thermometer from '@/components/Thermometer';
import Item from './components/Item';
import styles from './LiveTab.module.scss';

const LiveTab = () => {
  const { data } = useData();

  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <h2 className={styles.city}>{formatNames(data?.current)}</h2>
        <Thermometer className={styles.thermometer} />
        <h3 className={styles.temp}>{formatTemp(data?.current?.temp)}</h3>
      </div>
      <p>
        Some info about the 🔥<b>current hottest city</b> in the 🌍<b>world</b>
      </p>
      <div className={styles.info}>
        <Item value={formatPopulation(data?.current?.population)} icon="users" />
        <Item value={formatCountry(data?.current)} icon="globe" />
        <Item value={formatCoords(data?.current)} icon="map-marker" />
        <Item value={formatRank(data?.current)} icon="thermometer-full" />
      </div>
    </div>
  );
};

export default LiveTab;
