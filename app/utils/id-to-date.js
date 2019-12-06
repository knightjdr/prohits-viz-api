import mongodb from 'mongodb';

const { ObjectID } = mongodb;

const getTimestamp = id => (
  typeof id === 'string'
    ? ObjectID(id).getTimestamp()
    : id.getTimestamp()
);

// Gets the ISO date from a mongo _id field.
const idToDate = id => (
  ObjectID.isValid(id) ? getTimestamp(id) : null
);

export default idToDate;
