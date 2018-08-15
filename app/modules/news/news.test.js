const AddMongoDate = require('../helpers/add-mongo-date');
const Find = require('../db-methods/find');
const FindOne = require('../db-methods/find-one');
const News = require('./news');

const err = new Error('err');
const mongoID = '5aa6ac91c63eb43ab21a072c';

// return data
const returnValues = {
  news: {
    addDate: [{ headline: 1, dbDate: 'a' }, { headline: 2, dbDate: 'b' }],
    find: [{ headline: 1 }, { headline: 2 }],
  },
};

// mock AddMongoData
jest.mock('../helpers/add-mongo-date');

// mock Find
jest.mock('../db-methods/find');
jest.mock('../db-methods/find-one');

describe('News list', () => {
  describe('when find returns response object', () => {
    let response;
    beforeAll(async (done) => {
      Find
        .mockResolvedValueOnce(returnValues.news.find);
      AddMongoDate.arr
        .mockReturnValueOnce(returnValues.news.addDate);
      News()
        .then((result) => {
          response = result;
          done();
        });
    });

    afterAll(() => {
      AddMongoDate.arr.mockClear();
      Find.mockClear();
    });

    it('should return 200 status', () => {
      expect(response.status).toBe(200);
    });

    it('should return data object', () => {
      expect(response.data).toEqual({
        news: returnValues.news.addDate,
      });
    });
  });

  describe('when there is a news list error', () => {
    let response;
    beforeAll(async (done) => {
      Find
        .mockRejectedValueOnce(err);
      News()
        .then((result) => {
          response = result;
          done();
        });
    });

    afterAll(() => {
      Find.mockClear();
    });

    it('should return 500 status', () => {
      expect(response.status).toBe(500);
    });
  });

  describe('when there is a news item matching id', () => {
    let response;
    beforeAll(async (done) => {
      FindOne
        .mockResolvedValueOnce(returnValues.news.find[0])
      AddMongoDate.obj
        .mockReturnValueOnce(returnValues.news.addDate[0])
      News(mongoID)
        .then((result) => {
          response = result;
          done();
        });
    });

    afterAll(() => {
      AddMongoDate.obj.mockClear();
      FindOne.mockClear();
    });

    it('should return 200 status', () => {
      expect(response.status).toBe(200);
    });

    it('should return correct item', () => {
      expect(response.data).toEqual({
        news: returnValues.news.addDate[0],
      });
    });
  });

  describe('when there is no news item matching id', () => {
    let response;
    beforeAll(async (done) => {
      FindOne
        .mockResolvedValueOnce(null);
      News(mongoID)
        .then((result) => {
          response = result;
          done();
        });
    });

    afterAll(() => {
      FindOne.mockClear();
    });

    it('should return 204 status', () => {
      expect(response.status).toBe(204);
    });
  });

  describe('when there is a news item error', () => {
    let response;

    beforeAll(async (done) => {
      FindOne
        .mockRejectedValueOnce(err);
      News(mongoID)
        .then((result) => {
          response = result;
          done();
        });
    });

    afterAll(() => {
      FindOne.mockClear();
    });

    it('should return 500 status', () => {
      expect(response.status).toBe(500);
    });
  });

  describe('when there is an invalid id', () => {
    let response;

    beforeAll(async (done) => {
      FindOne
        .mockRejectedValueOnce(err);
      News('aaaa')
        .then((result) => {
          response = result;
          done();
        });
    });

    afterAll(() => {
      FindOne.mockClear();
    });

    it('should return 204 status', () => {
      expect(response.status).toBe(204);
    });
  });
});
