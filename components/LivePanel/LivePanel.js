import React from 'react';
import useData from '@/hooks/useData';
import {
  formatNames,
  formatPopulation,
  formatCountry,
  formatCoords,
  formatRank,
} from '@/helpers/format';
import Panel from '@/components/Panel';
import Thermometer from '@/components/Thermometer';
import Item from './components/Item';
// import styles from './LivePanel.module.scss';

const LivePanel = () => {
  const { isLoading, data } = useData();
  const { current, stats } = data;

  return (
    <Panel
      Title={() => (
        <>
          <h1 style={{ flex: 0, whiteSpace: 'wrap' }}>
            {formatNames(current)}
          </h1>
          <Thermometer
            temp={current?.temp}
            temprange={stats?.temprange}
            widthFactor={0.15}
            style={{ flex: 0 }}
          />
        </>
      )}
      isLoading={isLoading}
    >
      {!isLoading && (
        <>
          <Item value={formatPopulation(current?.population)} icon="users" />
          <Item value={formatCountry(current)} icon="globe" />
          <Item value={formatCoords(current)} icon="map-marker" />
          <Item value={formatRank(current)} icon="thermometer-full" />
        </>
      )}
    </Panel>
  );
};

export default LivePanel;
