const AddMongoDate = require('./add-mongo-date');
const IdToDate = require('./id-to-date');
const { ObjectID } = require('mongodb');

// mock idToDate
jest.mock('./id-to-date');
IdToDate
  .mockReturnValueOnce('2018-03-12T16:36:33Z')
  .mockReturnValueOnce('2018-03-12T16:36:40Z')
  .mockReturnValueOnce(null)
  .mockReturnValueOnce('2018-03-12T16:36:33Z')
  .mockReturnValueOnce(null);

const startingArr = [
  { _id: ObjectID('5aa6ac91c63eb43ab21a072c') },
  { _id: ObjectID('5aa6ac98c63eb43ab21a072d') },
  { _id: 'aaaa' },
  { field: 'bbb' },
];
const mappedArr = [
  { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), dbDate: '2018-03-12T16:36:33Z' },
  { _id: ObjectID('5aa6ac98c63eb43ab21a072d'), dbDate: '2018-03-12T16:36:40Z' },
  { _id: 'aaaa', dbDate: null },
  { field: 'bbb', dbDate: null },
];

describe('AddMongoDate', () => {
  test('add date to array of mongo documents', () => {
    // map array of objects
    expect(AddMongoDate.arr(startingArr)).toEqual(mappedArr);
    // simply return things that are not arrays
    expect(AddMongoDate.arr({ a: 1 })).toEqual({ a: 1 });
  });

  test('add date to mongo document', () => {
    // map array of objects
    expect(AddMongoDate.obj(startingArr[0])).toEqual(mappedArr[0]);
    // simply return things that are not object
    expect(AddMongoDate.arr(['a'])).toEqual(['a']);
  });
});
