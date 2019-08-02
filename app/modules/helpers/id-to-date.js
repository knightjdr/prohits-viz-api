const { ObjectID } = require('mongodb');

// grabs the ISO date from a mongo _id field
const idToDate = (id) => {
  if (ObjectID.isValid(id)) {
    if (typeof id === 'string') {
      return ObjectID(id).getTimestamp();
    }
    return id.getTimestamp();
  }
  return null;
};

module.exports = idToDate;
