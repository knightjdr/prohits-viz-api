/* Columns should be an array of strings */
const columns = (data) => {
  if (
    data &&
    Array.isArray(data) &&
    data.every(datum => typeof datum === 'string')
  ) {
    return data;
  }
  return new Error('Invalid column array');
};

module.exports = columns;
