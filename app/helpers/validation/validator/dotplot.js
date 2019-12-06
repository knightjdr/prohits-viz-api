import criteria from '../criteria.js';
import validateHeatmap from './heatmap.js';
import { settings } from '../default-values.js';

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

export default validateDotplot;
