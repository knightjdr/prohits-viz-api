import criteria from '../field-validation/criteria.js';
import validateAnnotations from '../field-validation/annotations.js';
import validateColor from '../field-validation/color.js';
import validateMarkers from '../field-validation/markers.js';
import { settings } from '../default-values.js';
import { validateColumnOrder, validateColumns } from '../field-validation/columns.js';
import { validateRowOrder, validateRows } from '../field-validation/rows.js';

const validateHeatmap = (type, value, defaultSettings = settings.heatmap) => {
  switch (type) {
    case 'abundanceCap':
      return criteria.isNumber(value, defaultSettings.abundanceCap);
    case 'annotations':
      return validateAnnotations(value);
    case 'columnDB':
      return validateColumns(value);
    case 'columnOrder':
      return validateColumnOrder(value);
    case 'fillColor':
      return validateColor(value, defaultSettings.fillColor);
    case 'invertColor':
      return criteria.isBoolean(value, defaultSettings.invertColor);
    case 'markers':
      return validateMarkers(value);
    case 'minAbundance':
      return criteria.isNumber(value, defaultSettings.minAbundance);
    case 'rowDB':
      return validateRows(defaultSettings.imageType, value);
    case 'rowOrder':
      return validateRowOrder(value);
    default:
      return null;
  }
};

export default validateHeatmap;
