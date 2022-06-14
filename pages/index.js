import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { providerDataContext } from '@/contexts/data';
import usePageView from '@/hooks/usePageView';
import Loading from '@/components/Loading';
import useData from '@/hooks/useData';
import LivePanel from '@/components/LivePanel';
import StatsPanel from '@/components/StatsPanel';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: Loading,
});

const IndexPage = providerDataContext(() => {
  usePageView('/');

  const { isLoading, data } = useData();

  return (
    <>
      <Head>
        <title>Hot Cities • world hottest city, now.</title>
      </Head>
      <Map
        center={isLoading ? [0, 0] : [data?.current?.lng, data?.current?.lat]}
        zoom={isLoading ? 3 : 7}
        data={data?.ranking}
      />
      <LivePanel />
      <StatsPanel />
    </>
  );
});

export default IndexPage;
