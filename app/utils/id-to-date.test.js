import { ObjectID } from 'mongodb';

import idToDate from './id-to-date';

describe('convert mongoDB _id to date', () => {
  it('should return null when date is invalid', () => {
    expect(idToDate('5aa6ac91c63eb43ab21a072')).toBeNull();
  });

  it('return timestamp when id is valid', () => {
    const id = ObjectID('5aa6ac91c63eb43ab21a072c');
    expect(idToDate(id)).toEqual(id.getTimestamp());
  });

  it('return timestamp when id is valid and a string', () => {
    const id = ObjectID('5aa6ac91c63eb43ab21a072c');
    expect(idToDate('5aa6ac91c63eb43ab21a072c')).toEqual(id.getTimestamp());
  });
});
