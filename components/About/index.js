import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../style/theme';

const InfoBit = ({ section, children }) => {
  return (
    <p>
      <b>{`${section} / `}</b>
      <>{children}</>
    </p>
  );
};

InfoBit.propTypes = {
  section: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const About = () => (
  <div className="about">
    <InfoBit section="What it is">
      Hot Cities monitors world cities temperatures in real time from global
      weather services to determine the hottest one, right now.
    </InfoBit>
    <InfoBit section="Why">Because hot is cool.</InfoBit>
    <InfoBit section="What is a city">
      {
        'Human settlements with a minimum population of half a milion inhabitants are considered.'
      }
    </InfoBit>
    <InfoBit section="What it means real time">
      Weather data are fetched every 10 minutes.
    </InfoBit>
    <InfoBit section="Where it fetch data from">
      It uses{' '}
      <a href="http://geonames.org" target="_blank" rel="noopener noreferrer">
        geonames.org
      </a>{' '}
      for geographical data,{' '}
      <a
        href="http://openweathermap.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        openweathermap.org
      </a>{' '}
      for weather data and{' '}
      <a href="http://flickr.com" target="_blank" rel="noopener noreferrer">
        flickr.com
      </a>{' '}
      for geolocated images.
    </InfoBit>
    <InfoBit section="Follow">
      Hot Cities is on{' '}
      <a
        href="https://twitter.com/intent/user?screen_name=hotcitiesworld"
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter (@hotcitiesworld)
      </a>
      ,{' '}
      <a
        href="https://www.instagram.com/hotcitiesworld/"
        target="_blank"
        rel="noopener noreferrer"
      >
        instagram (@hotcitiesworld)
      </a>{' '}
      and{' '}
      <a
        href="https://www.facebook.com/hotcitiesworld"
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
        href="http://github.com/bluephlavio/hotcities"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      .
    </InfoBit>
    <InfoBit section="Contact">contact@hotcities.world</InfoBit>
    <style jsx>
      {`
        .about {
          margin: 0;
          border: 0;
          padding: ${theme.dim.padding};
          background-color: ${theme.palette.primary};
          color: ${theme.palette.accent};
        }
      `}
    </style>
  </div>
);

export default About;
