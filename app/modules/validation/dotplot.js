const criteria = require('../helpers/validate-criteria');
const parameters = require('./parameters');

const { colorSchemes, scoreTypes, settings } = parameters;
const defaultSettings = settings.dotplot;

/* Validation checks parameters and if they are invalid, uses the default.
** If, however, the row or columns objects are invalid, returns an err. Properties
** to ignore can be specied in the second arg as an array of strings. */
const validateDotplot = (data, ignore = []) => {
  const {
    abundanceCap,
    columns,
    edgeColor,
    fillColor,
    invertColor,
    primaryFilter,
    rows,
    scoreType,
    secondaryFilter,
  } = data;
  let err = null;
  const syncObj = {
    imageType: 'dotplot',
  };
  if (!ignore.includes('abundanceCap')) {
    syncObj.abundanceCap = criteria.isNumber(abundanceCap, defaultSettings.abundanceCap);
  }
  if (!ignore.includes('columns')) {
    if (
      columns &&
      Array.isArray(columns) &&
      columns.every(column => typeof column === 'string')
    ) {
      syncObj.columns = columns;
    } else {
      err = new Error('Invalid column array');
    }
  }
  if (!ignore.includes('edgeColor')) {
    syncObj.edgeColor = edgeColor && colorSchemes.includes(edgeColor) ?
      edgeColor : defaultSettings.edgeColor;
  }
  if (!ignore.includes('fillColor')) {
    syncObj.fillColor = fillColor && colorSchemes.includes(fillColor) ?
      fillColor : defaultSettings.fillColor;
  }
  if (!ignore.includes('invertColor')) {
    syncObj.invertColor = criteria.isBoolean(invertColor, defaultSettings.invertColor);
  }
  if (!ignore.includes('primaryFilter')) {
    syncObj.primaryFilter = criteria.isNumber(primaryFilter, defaultSettings.primaryFilter);
  }
  if (!ignore.includes('rows')) {
    if (
      rows &&
      Array.isArray(rows) &&
      rows[0] && // Ensures not null as null is an object.
      typeof rows[0] === 'object' &&
      Object.prototype.hasOwnProperty.call(rows[0], 'name') &&
      typeof rows[0].name === 'string' &&
      Object.prototype.hasOwnProperty.call(rows[0], 'data') &&
      Array.isArray(rows[0].data) &&
      rows[0].data[0] &&
      typeof rows[0].data[0] === 'object' &&
      Object.prototype.hasOwnProperty.call(rows[0].data[0], 'ratio') &&
      Object.prototype.hasOwnProperty.call(rows[0].data[0], 'score') &&
      Object.prototype.hasOwnProperty.call(rows[0].data[0], 'value')
    ) {
      syncObj.rows = rows;
    } else {
      err = new Error('Invalid row array');
    }
  }
  if (!ignore.includes('scoreType')) {
    syncObj.scoreType = scoreType && scoreTypes.includes(scoreType) ?
      scoreType : defaultSettings.scoreType;
  }
  if (!ignore.includes('secondaryFilter')) {
    syncObj.secondaryFilter = criteria.isNumber(secondaryFilter, defaultSettings.secondaryFilter);
  }

  return {
    err,
    data: syncObj,
  };
};

module.exports = validateDotplot;
