import React from 'react';
import './About.scss';

const About = props => (
  <div className="about">

    <p>
      <b>What is it. </b>
                Hot Cities monitors world cities temperatures in real time from global weather services to determine the hottest one, right now.
    </p>
    <p>
      <b>What is a city. </b>
                Human settlements with a minimum population of half a milion inhabitants are considered.
    </p>
    <p>
      <b>What it means real time. </b>
                Weather data are fetched every 10 minutes.
    </p>
    <p>
      <b>Where it fetch data from. </b>
                It uses
      {' '}
      <a href="http://geonames.org" target="_blanck">geonames.org</a>
      {' '}
for geographical data,
      {' '}
      <a href="http://openweathermap.org" target="_blanck">openweathermap.org</a>
      {' '}
for weather data and
      {' '}
      <a href="http://flickr.com" target="_blanck">flickr.com</a>
      {' '}
for geolocated images.
    </p>
    <p>
      <b>Follow. </b>
                Hot Cities is on
      {' '}
      <a href="https://twitter.com/intent/user?screen_name=hotcitiesworld" target="_blanck">twitter (@hotcitiesworld)</a>
,
      {' '}
      <a href="https://www.instagram.com/hotcitiesworld/" target="_blanck">instagram (@hotcitiesworld)</a>
      {' '}
and
      {' '}
      <a href="https://www.facebook.com/hotcitiesworld" target="_blanck">facebook</a>
.
    </p>

    <p>
      <b>Support. </b>
                Like the project on
      {' '}
      <a href="http://github.com/bluephlavio/hotcities" target="_blanck">github</a>
.
    </p>
    <p>
      <b>Contact. </b>
                contact@hotcities.world.
    </p>
  </div>
);

export default About;
