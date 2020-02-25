import criteria from '../field-validation/criteria.js';

const validateMinCondition = (value) => {
  const [validNumber, validatedValue] = criteria.isNumber(value);
  if (validNumber && validatedValue > 0) {
    return [true, validatedValue];
  }

  return [false, null];
};

export default validateMinCondition;
