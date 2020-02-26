import isNumber from './is-number.js';

const checkCharactersDefined = (a, b) => {
  if (!a && !b) {
    return 0;
  } if (!a) {
    return 1;
  } if (!b) {
    return -1;
  }
  return null;
};

const checkNumbersDefined = (a, b) => {
  if (
    (!isNumber(a) || a == null)
    && (!isNumber(b) || b == null)
  ) {
    return 0;
  } if (!isNumber(a) || a == null) {
    return 1;
  } if (!isNumber(b) || b == null) {
    return -1;
  }
  return null;
};

const compareCharacters = (a, b) => {
  const nameA = String(a).toLowerCase();
  const nameB = String(b).toLowerCase();
  if (nameA < nameB) {
    return -1;
  } if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const compareNumbers = (a, b) => (
  Number(a) - Number(b)
);

const sort = {
  character: (a, b) => {
    let difference = checkCharactersDefined(a, b);
    if (difference === null) {
      difference = compareCharacters(a, b);
    }
    return difference;
  },
  numeric: (a, b) => {
    let difference = checkNumbersDefined(a, b);
    if (difference === null) {
      difference = compareNumbers(a, b);
    }
    return difference;
  },
};

export default sort;
