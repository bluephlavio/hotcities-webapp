import React from 'react';
import InfoBit from './components/InfoBit';
import styles from './About.module.scss';

const About = () => (
  <div className={styles.about}>
    <InfoBit section="What it is">
      Hot Cities monitors world cities temperatures in real time from global
      weather services to determine the hottest one, right now.
    </InfoBit>
    <InfoBit section="Why">
      Because hot is cool
      <span role="img" aria-label="hot">
        🔥
      </span>
      <span role="img" aria-label="cool">
        ✨
      </span>
      <span role="img" aria-label="love">
        ❤️
      </span>
      .
    </InfoBit>
    <InfoBit section="What is a city">
      Human settlements with a minimum population of half a milion inhabitants
      are considered.
    </InfoBit>
    <InfoBit section="What it means real time">
      Weather data are fetched every 10 minutes.
    </InfoBit>
    <InfoBit section="Where it fetch data from">
      It uses{' '}
      <a
        href="htt@/components//geonames.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        geonames.org
      </a>{' '}
      for geographical data,{' '}
      <a
        href="htt@/components//openweathermap.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        openweathermap.org
      </a>{' '}
      for weather data and{' '}
      <a
        href="htt@/components//flickr.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        flickr.com
      </a>{' '}
      for geolocated images.
    </InfoBit>
    <InfoBit section="Follow">
      Hot Cities is on{' '}
      <a
        href="http@/components//twitter.c@/components/inte@/components/user?screen_name=hotcitiesworld"
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter (@hotcitiesworld)
      </a>
      ,{' '}
      <a
        href="http@/components//www.instagram.c@/components/hotcitieswor@/components/"
        target="_blank"
        rel="noopener noreferrer"
      >
        instagram (@hotcitiesworld)
      </a>{' '}
      and{' '}
      <a
        href="http@/components//www.facebook.c@/components/hotcitiesworld"
        target="_blank"
        rel="noopener noreferrer"
      >
        facebook
      </a>
      .
    </InfoBit>
    <InfoBit section="Support">
      Like the project on{' '}
      <a
        href="htt@/components//github.c@/components/bluephlav@/components/hotcities"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      .
    </InfoBit>
    <InfoBit section="Contact">
      <pre>contact@hotcities.world</pre>
    </InfoBit>
  </div>
);

export default About;
