import formatcoords from 'formatcoords';

export const formatNames = (name, localname) =>
  `${name}${localname && localname !== name ? ` / ${localname}` : ''}`;

export const formatTemp = temp => `${Math.round(temp)} °C / ${Math.round(temp * 1.8 + 32)} °F`;

export const formatCountry = (name, code) => `${name} (${code})`;

export const formatCoords = coords => formatcoords(coords).format({ decimalPlaces: 0 });
