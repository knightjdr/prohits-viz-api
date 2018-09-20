const annotations = require('./annotations');
const color = require('./color');
const columns = require('./columns');
const criteria = require('./criteria');
const markers = require('./markers');
const rows = require('./rows');
const scoreType = require('./score-type');
const validColor = require('./valid-color');

const validate = imageType => (type, value, defaultSetting) => {
  switch (type) {
    case 'abundanceCap':
      return criteria.isNumber(value, defaultSetting);
    case 'annotationFontSize':
      return criteria.isNumber(value, defaultSetting);
    case 'annotations':
      return annotations(value);
    case 'columns':
      return columns(value);
    case 'edgeColor':
      return color(value, defaultSetting);
    case 'fillColor':
      return color(value, defaultSetting);
    case 'invertColor':
      return criteria.isBoolean(value, defaultSetting);
    case 'markerColor':
      return validColor(value, defaultSetting);
    case 'markers':
      return markers(value);
    case 'primaryFilter':
      return criteria.isNumber(value, defaultSetting);
    case 'rows':
      return rows(imageType, value);
    case 'scoreType':
      return scoreType(value, defaultSetting);
    case 'secondaryFilter':
      return criteria.isNumber(value, defaultSetting);
    default:
      return null;
  }
};

module.exports = validate;
