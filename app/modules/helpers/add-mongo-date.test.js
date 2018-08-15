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
  it('should add date to array of mongo documents', () => {
    expect(AddMongoDate.arr(startingArr)).toEqual(mappedArr);
  });

  it('should simply return things that are not an array', () => {
    expect(AddMongoDate.arr({ a: 1 })).toEqual({ a: 1 });
  })

  it('should add date to mongo document', () => {
    expect(AddMongoDate.obj(startingArr[0])).toEqual(mappedArr[0]);
  });

  it('should return null date to mongo document', () => {
    expect(AddMongoDate.obj(startingArr[3])).toEqual(mappedArr[3]);
  });

  it('should simply return things that are not an object', () =>{
    expect(AddMongoDate.obj(['a'])).toEqual(['a']);
  })
});
