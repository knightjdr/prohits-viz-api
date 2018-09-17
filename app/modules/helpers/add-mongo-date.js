const idToDate = require('./id-to-date');

// adds ISO date to an array of mongo documents based on the _id field
const addMongoDate = {
  arr: (arr) => {
    if (Array.isArray(arr)) {
      return arr.map(obj => ({
        ...obj,
        dbDate: obj._id ? idToDate(obj._id) : null,
      }));
    }
    return arr;
  },
  obj: (obj) => {
    if (
      typeof obj === 'object' &&
      !Array.isArray(obj)
    ) {
      return Object.assign(
        {},
        obj,
        {
          dbDate: obj._id ? idToDate(obj._id) : null,
        },
      );
    }
    return obj;
  },
};
module.exports = addMongoDate;
