import validateControl from '../../field-validation/control.js';
import validateReadoutLength from '../../field-validation/readout-length.js';
import { validateNormalizationSetting } from '../../field-validation/normalization.js';

export const validateScoreFilters = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (
    validated.scoreType === 'lte'
    && validated.secondaryFilter < validated.primaryFilter
  ) {
    errors.secondaryFilter = 'should be greater than or equal to primary filter';
  } if (
    validated.scoreType === 'gte'
    && validated.secondaryFilter > validated.primaryFilter
  ) {
    errors.secondaryFilter = 'should be less than or equal to primary filter';
  }

  return [validated, errors];
};

const validateSettings = (settings) => {
  const validated = { values: { ...settings } };

  [validated.values, validated.errors] = validateControl(validated.values, validated.errors);
  [validated.values, validated.errors] = validateNormalizationSetting(validated.values, validated.errors);
  [validated.values, validated.errors] = validateScoreFilters(validated.values, validated.errors);
  [validated.values, validated.errors] = validateReadoutLength(validated.values, validated.errors);

  return validated;
};

export default validateSettings;
