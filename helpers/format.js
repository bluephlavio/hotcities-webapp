import formatcoords from 'formatcoords';

export const formatNames = ({ name, localname }) =>
  `${name}${localname && localname !== name ? ` / ${localname}` : ''}`;

export const formatTemp = (temp, decimals = 0) =>
  `${temp.toFixed(decimals)} °C / ${(temp * 1.8 + 32).toFixed(decimals)} °F`;

export const formatCountry = ({ countryname: name, countrycode: code }) =>
  `${name} (${code})`;

export const formatCoords = ({ lng, lat }) =>
  formatcoords({ lng, lat }).format({ decimalPlaces: 0 });

export const formatFracAsPerc = (frac, decimals = 0) => `${(frac * 100).toFixed(decimals)} %`;

export const formatRank = ({ rank, score }) =>
  `Ranked ${rank}th with a score of ${score.toFixed(2)}`;

export const formatPopulation = population => `${population} inhab.`;
