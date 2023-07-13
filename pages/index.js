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

  const lng = data?.current?.city?.lng || 0;
  const lat = data?.current?.city?.lat || 0;

  return (
    <>
      <Head>
        <title>Hot Cities • world hottest city, now.</title>
      </Head>
      <Map
        center={isLoading || focus === 'stats' ? [0, 25] : [lng, lat]}
        zoom={isLoading || focus === 'stats' ? 2 : 7}
        data={data?.ranking}
      />
      <Panel />
    </>
  );
});

export default IndexPage;
