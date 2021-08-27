export const validateColumnOrder = (data) => {
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(datum => typeof datum === 'number')
  ) {
    return data;
  }

  throw new Error('Invalid column order array');
};

/* Columns should be an array of strings or numbers */
export const validateColumns = (data) => {
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(datum => typeof datum === 'number' || typeof datum === 'string')
  ) {
    return data;
  }

  throw new Error('Invalid column DB array');
};
