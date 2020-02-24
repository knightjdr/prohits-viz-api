import criteria from '../../viz/field-validation/criteria.js';

const validateMinCondition = value => (
  criteria.isNumber(value) && value > 0
);

export default validateMinCondition;
