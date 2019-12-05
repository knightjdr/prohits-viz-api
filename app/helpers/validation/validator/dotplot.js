const criteria = require('../criteria');
const validateHeatmap = require('./heatmap');
const { settings } = require('../default-values');

const validateDotplot = (type, value, defaultSettings = settings.dotplot) => {
  const validatedResult = validateHeatmap(type, value);

  if (!validatedResult) {
    switch (type) {
      case 'edgeColor':
        return color(value, defaultSettings.edgeColor);
      case 'primaryFilter':
        return criteria.isNumber(value, defaultSettings.primaryFilter);
      case 'scoreType':
        return scoreType(value, defaultSettings.scoreType);
      case 'secondaryFilter':
        return criteria.isNumber(value, defaultSettings.secondaryFilter);
      default:
        return null;
    }
  }

  return validatedResult;
};

module.exports = validateDotplot;
