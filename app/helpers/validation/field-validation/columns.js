/* Columns should be an array of strings or numbers */
const validateColumns = (data) => {
  if (
    Array.isArray(data)
    && data.length > 0
    && data.every(datum => typeof datum === 'number' || typeof datum === 'string')
  ) {
    return data;
  }

  throw new Error('Invalid column array');
};

export default validateColumns;
