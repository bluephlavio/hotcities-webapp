import React from 'react';
import './About.css';

const About = (props) => {
	return (
		<div className="about">

			<p>
				<b>What is it. </b>
				HOT CITIES monitors in real time the temperatures of world cities to attest the hottest city on earth.
			</p>
			<p>
				<b>What is a city. </b>
				Cities with a minimum population of 500 000 are considered.
			</p>
			<p>
				<b>What it means real time. </b>
				Weather data are fetched every 10 minutes.
			</p>
			<p>
				<b>Where it fetch data from. </b>
				It uses <a href="http://geonames.org" target="_blanck">geonames.org</a> for geographical data, <a href="http://openweathermap.org" target="_blanck">openweathermap.org</a> for weather data and <a href="http://flickr.com" target="_blanck">flickr.com</a> for geolocated images.
			</p>
			<p>
				<b>Follow. </b>
				Follow <a href="https://twitter.com/intent/user?screen_name=hotcitiesworld" target="_blanck">hotcitiesworld</a> on twitter to get updated with the hottest city on earth in real time.
			</p>

			<p>
				<b>Like. </b>
				Like the project on <a href="http://github.com/bluephlavio/hotcities" target="_blanck">github</a>.
			</p>
			<p>
				<b>Contact. </b>
				email: contact@hotcities.world.
			</p>
		</div>
	);
}

export default About;