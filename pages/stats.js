import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Panel from '@/components/Panel';
import Ranking from '@/components/Ranking';
import Loading from '@/components/Loading';
import usePageView from '@/hooks/usePageView';
import useApi from '@/hooks/useApi';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: Loading
});

const StatsPage = () => {
  usePageView('/stats');

  const { isLoading, data } = useApi({ method: 'get', path: 'web/stats' });

  return (
    <>
      <Head>
        <title>Hot Cities • Stats</title>
        <meta
          name="description"
          content="Hot Cities collects statistics about global hottest cities and visualize them through maps and tables."
        />
        <meta property="og:title" content="Hot Cities • Stats" />
        <meta
          property="og:description"
          content="Hot Cities collects statistics about global hottest cities and visualize them through maps and tables."
        />
      </Head>
      {isLoading ? <Loading /> : <Map data={data.ranking} />}
      <Panel Title={() => 'Stats'} isLoading={isLoading}>
        <Ranking data={isLoading ? [] : data.ranking} />
      </Panel>
    </>
  );
};

export default StatsPage;
