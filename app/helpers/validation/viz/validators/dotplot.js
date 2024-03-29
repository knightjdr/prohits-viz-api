import criteria from '../field-validation/criteria.js';
import settings from './default-values.js';
import validateColor from '../field-validation/color.js';
import validateHeatmap from './heatmap.js';
import validateScoreType from '../field-validation/score-type.js';

const validateDotplot = (type, value, defaultSettings = settings.dotplot) => {
  const validatedResult = validateHeatmap(type, value, defaultSettings);

  if (validatedResult === null) {
    switch (type) {
      case 'edgeColor':
        return validateColor(value, defaultSettings.edgeColor);
      case 'primaryFilter':
        return criteria.isNumber(value, defaultSettings.primaryFilter);
      case 'resetRatios':
        return criteria.isBoolean(value, defaultSettings.resetRatios);
      case 'scoreType':
        return validateScoreType(value, defaultSettings.scoreType);
      case 'secondaryFilter':
        return criteria.isNumber(value, defaultSettings.secondaryFilter);
      default:
        return null;
    }
  }

  return validatedResult;
};

export default validateDotplot;
