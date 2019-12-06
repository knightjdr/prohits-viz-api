import isNumber from './is-number.js';

const isInRange = (value, min = 0, max = 1) => (
  isNumber(value)
  && value >= min
  && value <= max
);

export default isInRange;
