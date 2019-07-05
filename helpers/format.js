import formatcoords from 'formatcoords';

export const formatNames = ({ name, localname }) =>
  `${name}${localname && localname !== name ? ` / ${localname}` : ''}`;

export const formatTemp = temp =>
  `${Math.round(temp)} °C / ${Math.round(temp * 1.8 + 32)} °F`;

export const formatCountry = ({ countryname: name, countrycode: code }) =>
  `${name} (${code})`;

export const formatCoords = ({ lng, lat }) =>
  formatcoords({ lng, lat }).format({ decimalPlaces: 0 });

export const formatFracAsPerc = frac => `${(frac * 100).toFixed(0)} %`;

export const formatRank = ({ rank, score }) =>
  `Ranked ${rank}th with a score of ${score.toFixed(2)}`;

export const formatPopulation = population => `${population} inhab.`;
