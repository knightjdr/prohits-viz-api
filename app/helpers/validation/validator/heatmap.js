const criteria = require('../criteria');
const { settings } = require('../default-values');

const validateHeatmap = (type, value, defaultSettings = settings.heatmap) => {
  switch (type) {
    case 'abundanceCap':
      return criteria.isNumber(value, defaultSettings.abundanceCap);
    case 'annotations':
      return annotations(value);
    case 'columns':
      return columns(value);
    case 'fillColor':
      return color(value, defaultSettings.fillColor);
    case 'invertColor':
      return criteria.isBoolean(value, defaultSettings.invertColor);
    case 'markers':
      return markers(value);
    case 'minAbundance':
      return criteria.isNumber(value, defaultSettings.minAbundance);
    case 'rows':
      return rows(imageType, value);
    default:
      return null;
  }
};

export default validateHeatmap;
