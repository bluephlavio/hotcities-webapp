export const mapRecordTemperature = (temp, tempRange) => {
  const [minTemp, maxTemp] = tempRange;
  const deltaTemp = maxTemp - minTemp;
  return (temp - minTemp) / deltaTemp;
};

export const calcScore = (recordFrac, recordTemp, tempRange) => {
  const recordTempFrac = mapRecordTemperature(recordTemp, tempRange);
  return recordFrac * recordTempFrac ** 5 * 100;
};

export const getSorterFunction =
  (key, tempRange) =>
  ({ recordfrac, recordtemp }) => {
    switch (key) {
      case 'recordfrac':
        return -recordfrac;

      case 'recordtemp':
        return -recordtemp;

      case 'score':
        return -calcScore(recordfrac, recordtemp, tempRange);

      default:
        return 0;
    }
  };
