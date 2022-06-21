import React from 'react';
import Head from 'next/head';
import { providerDataContext } from '@/contexts/data';
import usePageView from '@/hooks/usePageView';
import useData from '@/hooks/useData';
import Panel from '@/components/Panel';
import Map from '@/components/Map';

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
