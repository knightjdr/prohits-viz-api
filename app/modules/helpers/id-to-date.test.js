const IdToDate = require('./id-to-date');
const { ObjectID } = require('mongodb');

const id = ObjectID('5aa6ac91c63eb43ab21a072c');
const invalidId = '5aa6ac91c63eb43ab21a072';

test('convert mongoDB _id to date', () => {
  expect(IdToDate(id)).toEqual(id.getTimestamp());
  expect(IdToDate(invalidId)).toBeNull();
});
