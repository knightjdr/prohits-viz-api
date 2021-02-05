export const validateColumnDB = (columnDB) => {
  if (
    !columnDB
    || !Array.isArray(columnDB)
  ) {
    throw new Error('The file must include a "columnDB" array');
  }
};

export const validateRowDB = (rowDB) => {
  if (
    !rowDB
    || !Array.isArray(rowDB)
  ) {
    throw new Error('The file must include a "rowDB" array');
  }

  if (
    rowDB.length === 0
    || !rowDB[0].data
    || !rowDB[0].name
  ) {
    throw new Error('Each "rowDB" entry should have a "data" and "name" property');
  }

  if (
    !Array.isArray(rowDB[0].data)
    || rowDB[0].data[0].value === undefined
  ) {
    throw new Error('The row data should be an array with at least a "value" property');
  }
};

const validateHeatmapFields = (data) => {
  const {
    columnDB,
    rowDB,
  } = data;

  validateColumnDB(columnDB);
  validateRowDB(rowDB);
};

export default validateHeatmapFields;
