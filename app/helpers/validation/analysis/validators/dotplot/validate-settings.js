import removeDuplicates from '../../../../../utils/remove-duplicates.js';
import validateAbundanceFilters from '../../field-validation/abundance-filters.js';
import validateCommonSettings from '../common/validate-settings.js';
import validateScoreFilters from '../../field-validation/score-filters.js';

export const validateClustering = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  const reQuotes = new RegExp(/['"]+/g);
  const reSeparator = new RegExp(/[\s,]+/);

  const parseList = (text) => {
    const arr = text.trim().split(reSeparator).filter((string) => string);
    return removeDuplicates(arr.map((string) => string.replace(reQuotes, '')));
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

const validateSettings = (settings) => {
  const validated = validateCommonSettings(settings);

  [validated.values, validated.errors] = validateAbundanceFilters(validated.values, validated.errors);
  [validated.values, validated.errors] = validateClustering(validated.values, validated.errors);
  [validated.values, validated.errors] = validateScoreFilters(validated.values, validated.errors);

  return validated;
};

export default validateSettings;
