const isObject = require('./is-object');

const validateArray = (testArray, defaultArray = []) => (
  Array.isArray(testArray) ? testArray : defaultArray
);

const validateBoolean = (testValue, defaultBoolean = false) => (
  typeof testValue === 'boolean' ? testValue : defaultBoolean
);

const validateNumber = (testValue, defaultNumber = 0) => (
  typeof testValue === 'number' ? testValue : defaultNumber
);

const validateObject = (testObject, defaultObject = {}) => (
  isObject(testObject) ? testObject : defaultObject
);

const validateString = (testValue, defaultString = '') => (
  typeof testValue === 'string' ? testValue : defaultString
);

module.exports = {
  validateArray,
  validateBoolean,
  validateNumber,
  validateObject,
  validateString,
};
