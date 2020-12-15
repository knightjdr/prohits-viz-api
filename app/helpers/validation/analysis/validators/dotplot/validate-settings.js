import removeDuplicates from '../../../../../utils/remove-duplicates.js';
import validateControl from '../../field-validation/control.js';
import validateReadoutLength from '../../field-validation/readout-length.js';
import { validateNormalizationSetting } from '../../field-validation/normalization.js';

export const validateAbundanceFilters = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (validated.abundanceCap <= validated.minAbundance) {
    errors.abundanceCap = 'should be greater than minimum abundance';
  }

  return [validated, errors];
};

export const validateClustering = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  const reQuotes = new RegExp(/['"]+/g);
  const reSeparator = new RegExp(/[\s,]+/);

  const parseList = (text) => {
    const arr = text.trim().split(reSeparator).filter(string => string);
    return removeDuplicates(arr.map(string => string.replace(reQuotes, '')));
  };

  if (validated.clustering === 'none' && validated.conditionClustering !== 'conditions') {
    if (validated.conditionList === '' || validated.conditionList === []) {
      errors.conditionList = 'missing conditions for ordering';
    } if (typeof validated.conditionList === 'string') {
      validated.conditionList = parseList(validated.conditionList);
    }
  }

  if (validated.clustering === 'none' && validated.readoutClustering !== 'readouts') {
    if (validated.readoutList === '' || validated.readoutList === []) {
      errors.readoutList = 'missing readouts for ordering';
    } if (typeof validated.readoutList === 'string') {
      validated.readoutList = parseList(validated.readoutList);
    }
  }

  return [validated, errors];
};

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

  [validated.values, validated.errors] = validateAbundanceFilters(validated.values, validated.errors);
  [validated.values, validated.errors] = validateClustering(validated.values, validated.errors);
  [validated.values, validated.errors] = validateControl(validated.values, validated.errors);
  [validated.values, validated.errors] = validateNormalizationSetting(validated.values, validated.errors);
  [validated.values, validated.errors] = validateScoreFilters(validated.values, validated.errors);
  [validated.values, validated.errors] = validateReadoutLength(validated.values, validated.errors);

  return validated;
};

export default validateSettings;
