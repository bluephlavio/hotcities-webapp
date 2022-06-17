import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { providerDataContext } from '@/contexts/data';
import usePageView from '@/hooks/usePageView';
import Loading from '@/components/Loading';
import useData from '@/hooks/useData';
import Panel from '@/components/Panel';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: Loading,
});

const IndexPage = providerDataContext(() => {
  usePageView('/');

  const { isLoading, data, focus } = useData();

  return (
    <>
      <Head>
        <title>Hot Cities • world hottest city, now.</title>
      </Head>
      <Map
        center={isLoading || focus === 'stats' ? [0, 25] : [data?.current?.lng, data?.current?.lat]}
        zoom={isLoading || focus === 'stats' ? 2 : 7}
        data={data?.stats?.ranking}
      />
      <Panel />
    </>
  );
});

export default IndexPage;
