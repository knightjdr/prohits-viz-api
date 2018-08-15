const IdToDate = require('./id-to-date');

// adds ISO date to an array of mongo documents based on the _id field
const AddMongoDate = {
  arr: (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((obj) => {
        return Object.assign(
          {},
          obj,
          {
            dbDate: obj._id ? IdToDate(obj._id) : null,
          },
        );
      });
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
          dbDate: obj._id ? IdToDate(obj._id) : null,
        },
      );
    }
    return obj;
  },
};
module.exports = AddMongoDate;
