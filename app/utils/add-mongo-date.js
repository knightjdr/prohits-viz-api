import idToDate from './id-to-date.js';

const createDate = id => (
  id ? idToDate(id) : null
);

const addToArray = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map(obj => ({
      ...obj,
      dbDate: createDate(obj._id),
    }));
  }
  return arr;
};

const addToObject = (obj) => {
  if (
    typeof obj === 'object' &&
    !Array.isArray(obj)
  ) {
    return {
      ...obj,
      dbDate: createDate(obj._id),
    };
  }
  return obj;
};

// Add ISO date to an array or object of mongo documents based on the _id field.
const addMongoDate = {
  arr: arr => addToArray(arr),
  obj: obj => addToObject(obj),
};

export default addMongoDate;
