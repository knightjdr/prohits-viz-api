import parseIfJSON from '../../../../utils/parse-if-json.js';

const criteria = {
  isArray: (value) => {
    if (Array.isArray(value)) {
      return [true, value];
    }

    const parsed = parseIfJSON(value);
    if (parsed && Array.isArray(parsed)) {
      return [true, parsed];
    }

    return [false, null];
  },
  isBoolean: (value) => {
    if (value === true || value === 'true') {
      return [true, true];
    }

    if (value === false || value === 'false') {
      return [true, false];
    }

    return [false, null];
  },
  isNumber: (value) => {
    if (typeof value === 'number') {
      return [true, value];
    }

    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return [true, parsed];
    }

    return [false, null];
  },
  isString: (value) => {
    if (typeof value === 'string') {
      return [true, value];
    }

    return [false, null];
  },
  requiredString: (value) => {
    if (typeof value === 'string' && value) {
      return [true, value];
    }

    return [false, null];
  },
};

export default criteria;
