import criteria from '../../field-validation/criteria.js';
import validateCommon, { getFieldValidator } from '../common/validate-fields.js';

const acceptedMetrics = ['fe', 'zscore', 'sscore', 'dscore', 'wdscore'];

const validateMetric = (value) => {
  if (!value || acceptedMetrics.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

const validateFields = (type, value) => {
  const validatedResult = validateCommon(type, value);

  if (validatedResult === null) {
    const validateField = getFieldValidator(value);
    switch (type) {
      case 'minAbundance':
        return validateField(criteria.isNumber, 'should be a number');
      case 'primaryFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'specificityMetric':
        return validateField(validateMetric, `invalid metric: ${value}`);
      default:
        return {};
    }
  }

  return validatedResult;
};

export default validateFields;
