import formatcoords from 'formatcoords';

function formatTemp(temp) {
  return `${Math.round(temp)} °C`;
}

function formatCoords(lat, lng) {
  return formatcoords(lat, lng)
    .format('DD MM X', {
      latLonSeparator: ' ',
      decimalPlaces: 0,
    });
}

function formatCountry(country, code) {
  return `${country} (${code})`;
}

function formatNames(name, localname) {
  if (localname && localname !== name) {
    return `${name} | ${localname}`;
  }
  return name;
}

function fracToPerc(frac) {
  return `${Math.round(frac * 100)} %`;
}

export default {
  formatTemp,
  formatCoords,
  formatCountry,
  formatNames,
  fracToPerc,
};
