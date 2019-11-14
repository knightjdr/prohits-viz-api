const isObject = value => (
  typeof value === 'object'
  && !Array.isArray(value)
  && !(value instanceof Function)
  && value !== null
);

module.exports = isObject;
