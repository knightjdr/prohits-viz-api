import { ObjectId } from 'mongodb';

const getTimestamp = id => (
  typeof id === 'string'
    ? ObjectId(id).getTimestamp()
    : id.getTimestamp()
);

// Gets the ISO date from a mongo _id field.
const idToDate = id => (
  ObjectId.isValid(id) ? getTimestamp(id) : null
);

export default idToDate;
