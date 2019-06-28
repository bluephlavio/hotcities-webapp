import formatcoords from 'formatcoords';

export const formatNames = (name, localname) =>
  `${name}${localname && localname !== name ? ` | ${localname}` : ''}`;

export const formatTemp = temp => `${temp} °C`;

export const formatCountry = (name, code) => `${name} (${code})`;

export const formatCoords = coords => formatcoords(coords).format();
