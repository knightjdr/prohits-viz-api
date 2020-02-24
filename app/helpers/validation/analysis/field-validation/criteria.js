const criteria = {
  isBoolean: value => (
    typeof value === 'boolean'
  ),
  isNumber: value => (
    typeof value === 'number'
  ),
  isString: value => (
    typeof value === 'string'
  ),
};

export default criteria;
