import criteria from '../field-validation/criteria.js';
import validateAnnotations from '../field-validation/annotations.js';
import validateColor from '../field-validation/color.js';
import validateColumns from '../field-validation/columns.js';
import validateMarkers from '../field-validation/markers.js';
import validateRows from '../field-validation/rows.js';
import { settings } from '../default-values.js';

const validateHeatmap = (type, value, defaultSettings = settings.heatmap) => {
  switch (type) {
    case 'abundanceCap':
      return criteria.isNumber(value, defaultSettings.abundanceCap);
    case 'annotations':
      return validateAnnotations(value);
    case 'columns':
      return validateColumns(value);
    case 'fillColor':
      return validateColor(value, defaultSettings.fillColor);
    case 'invertColor':
      return criteria.isBoolean(value, defaultSettings.invertColor);
    case 'markers':
      return validateMarkers(value);
    case 'minAbundance':
      return criteria.isNumber(value, defaultSettings.minAbundance);
    case 'rows':
      return validateRows(defaultSettings.imageType, value);
    default:
      return null;
  }
};

export default validateHeatmap;
