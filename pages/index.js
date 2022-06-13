import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import useApi from '@/hooks/useApi';
import usePageView from '@/hooks/usePageView';
import Panel from '@/components/Panel';
import Loading from '@/components/Loading';
import Item from '@/components/Item';
import Thermometer from '@/components/Thermometer';
import {
  formatNames,
  formatRank,
  formatCountry,
  formatCoords,
  formatPopulation
} from '@/helpers/format';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: Loading
});

const IndexPage = () => {
  usePageView('/');

  const { isLoading, data } = useApi({ method: 'get', path: 'web/live' });

  return (
    <>
      <Head>
        <title>Hot Cities • world hottest city, now.</title>
      </Head>
      <Map
        center={isLoading ? [0, 0] : [data?.current?.lng, data?.current?.lat]}
        zoom={isLoading ? 0 : 12}
      />
      <Panel
        Title={() => (
          <>
            <h1 style={{ flex: 0, whiteSpace: 'wrap' }}>
              {formatNames(data?.current)}
            </h1>
            <Thermometer
              temp={data?.current?.temp}
              temprange={data?.stats?.temprange}
              widthFactor={0.15}
              style={{ flex: 0 }}
            />
          </>
        )}
        isLoading={isLoading}
      >
        {!isLoading && (
          <>
            <Item
              value={formatPopulation(data?.current?.population)}
              icon="users"
            />
            <Item value={formatCountry(data?.current)} icon="globe" />
            <Item value={formatCoords(data?.current)} icon="map-marker" />
            <Item value={formatRank(data?.current)} icon="thermometer-full" />
          </>
        )}
      </Panel>
    </>
  );
};

export default IndexPage;
