import criteria from '../../field-validation/criteria.js';
import validateLogBase from '../../field-validation/log-base.js';
import validateNormalization from '../../field-validation/normalization.js';
import validateScoreType from '../../field-validation/score-type.js';

export const getFieldValidator = (value) => (validator, warning) => {
  const [valid, validatedValue] = validator(value);
  if (valid) {
    return { value: validatedValue };
  }
  return { error: warning };
};

export const validateAbundance = (value) => {
  if (typeof value === 'string') {
    return criteria.requiredString(value);
  } if (Array.isArray(value) && value.length > 0) {
    return [true, value];
  }
  return [false, null];
};

const validateCommon = (type, value) => {
  const validateField = getFieldValidator(value);

  switch (type) {
    case 'abundance':
      return validateField(validateAbundance, 'missing column name');
    case 'condition':
      return validateField(criteria.requiredString, 'missing column name');
    case 'control':
      return validateField(criteria.isString, 'missing column name');
    case 'ctrlSub':
      return validateField(criteria.isBoolean, 'should be a boolean');
    case 'logBase':
      return validateField(validateLogBase, `invalid base: ${value}`);
    case 'mockConditionAbundance':
      return validateField(criteria.isBoolean, 'should be a boolean');
    case 'normalization':
      return validateField(validateNormalization, 'invalid value');
    case 'normalizationReadout':
      return validateField(criteria.isString, 'should be a string');
    case 'otherAbundance':
      return validateField(criteria.isArray, 'should be an array');
    case 'readout':
      return validateField(criteria.requiredString, 'missing column name');
    case 'readoutLength':
      return validateField(criteria.isString, 'missing column name');
    case 'readoutLengthNorm':
      return validateField(criteria.isBoolean, 'should be a boolean');
    case 'sampleFile':
      return validateField(criteria.isBoolean, 'should be a boolean');
    case 'score':
      return validateField(criteria.requiredString, 'missing column name');
    case 'scoreType':
      return validateField(validateScoreType, 'invalid value');
    case 'png':
      return validateField(criteria.isBoolean, 'should be a boolean');
    default:
      return null;
  }
};

export default validateCommon;
