import React from 'react';
import useData from '@/hooks/useData';
import { formatNames, formatTemp, formatPopulation, formatCountry, formatCoords } from '@/helpers/format';
import Thermometer from '@/components/Thermometer';
import Item from './components/Item';
import styles from './LiveTab.module.scss';

const LiveTab = () => {
  const { data } = useData();

  if (!data) return null;

  const current = data?.current;
  const { temp, city } = current;
  const { name, localname, population, countryname, countrycode, lng, lat } = city;

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <h2 className={styles.city}>{formatNames({ name, localname })}</h2>
        <Thermometer className={styles.thermometer} />
        <h3 className={styles.temp}>{formatTemp(temp)}</h3>
      </div>
      <p>
        Some info about the 🔥<b>current hottest city</b> in the 🌍<b>world</b>
      </p>
      <div className={styles.info}>
        <Item value={formatPopulation(population)} icon="users" />
        <Item value={formatCountry({ countryname, countrycode })} icon="globe" />
        <Item value={formatCoords({ lng, lat })} icon="map-marker" />
        {/* <Item value={formatRank(city)} icon="thermometer-full" /> */}
      </div>
    </div>
  );
};

export default LiveTab;
