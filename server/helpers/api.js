const parseString = (rawString) => {
  if (rawString) {
    const n = Number(rawString);
    if (n || n === 0) {
      return n;
    } if (Date.parse(rawString)) {
      return new Date(rawString);
    }
  }
  return rawString;
};

const parseQueryParamValue = (rawValue) => {
  if (rawValue) {
    const values = rawValue.split(',');
    return values.map((value) => {
      if (['>', '<'].includes(value[0])) {
        return [value[0], parseString(value.slice(1))];
      }
      return parseString(value);
    });
  }
  return [rawValue];
};

export default {
  parseString,
  parseQueryParamValue,
};
