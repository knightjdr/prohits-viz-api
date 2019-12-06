const criteria = {
  isBoolean: (value, defaultValue) => (
    typeof value === 'boolean' ? value : defaultValue
  ),
  isNumber: (value, defaultValue) => (
    typeof value === 'number' ? value : defaultValue
  ),
  isString: (value, defaultValue) => (
    typeof value === 'string' ? value : defaultValue
  ),
};

export default criteria;
