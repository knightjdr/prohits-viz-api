import criteria from '../../field-validation/criteria.js';
import validateCommon, { getFieldValidator } from '../common/validate-fields.js';

const validateFields = (type, value) => {
  const validatedResult = validateCommon(type, value);

  if (validatedResult === null) {
    const validateField = getFieldValidator(value);
    switch (type) {
      case 'conditionX':
        return validateField(criteria.requiredString, 'missing condition name');
      case 'conditionY':
        return validateField(criteria.requiredString, 'missing condition name');
      case 'minAbundance':
        return validateField(criteria.isNumber, 'should be a number');
      case 'primaryFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'secondaryFilter':
        return validateField(criteria.isNumber, 'should be a number');
      default:
        return {};
    }
  }

  return validatedResult;
};

export default validateFields;
