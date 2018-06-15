const formatcoords = require('formatcoords');

function temp(temp) {
	return Math.round(temp) + ' °C';
}

function coords(lat, lng) {
	return formatcoords(lat, lng)
		.format("DD MM X", {
			latLonSeparator: " ",
			decimalPlaces: 0
		});
}

function country(country, code) {
	return country + ' (' + code + ')';
}

function names(name, localname) {
	if (localname && localname !== name) {
		return name + ' | ' + localname;
	} else {
		return name;
	}
}

module.exports = {
	names,
	country,
	coords,
	temp
}