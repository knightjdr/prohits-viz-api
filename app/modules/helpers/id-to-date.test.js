const IdToDate = require('./id-to-date');
const { ObjectID } = require('mongodb');

const id = ObjectID('5aa6ac91c63eb43ab21a072c');
const invalidId = '5aa6ac91c63eb43ab21a072';

describe('convert mongoDB _id to date', () => {
  it('should return null when date is invalide', () => {
    expect(IdToDate(invalidId)).toBeNull();
  });

  it('return timestamp when id is valid', () => {
    expect(IdToDate(id)).toEqual(id.getTimestamp());
  });
});
