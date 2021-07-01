import addMongoDate from '../../utils/add-mongo-date.js';
import findOne from '../../helpers/database/find-one.js';
import getArticle from './get-article.js';

jest.mock('../../utils/add-mongo-date');
jest.mock('../../helpers/database/find-one');

const res = {
  end: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
};
const returnValues = {
  article: {
    addDate: [{ headline: 'article 1', dbDate: 'a' }, { headline: 'article 2', dbDate: 'b' }],
    find: [{ headline: 'article 1' }, { headline: 'article 2' }],
  },
};

describe('News article', () => {
  describe('when there is a matching headline', () => {
    beforeAll(async () => {
      findOne.mockClear();
      res.status.mockClear();
      res.send.mockClear();
      findOne.mockResolvedValueOnce(returnValues.article.find[0]);
      addMongoDate.obj.mockReturnValueOnce(returnValues.article.addDate[0]);

      const req = { params: { headline: 'article-1' } };
      await getArticle(req, res);
    });

    it('should find article with headline', () => {
      expect(findOne).toHaveBeenCalledWith('news', { headline: 'article 1' });
    });

    it('should return default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return correct item', () => {
      expect(res.send).toHaveBeenCalledWith({
        article: returnValues.article.addDate[0],
      });
    });
  });

  describe('when there is no news item matching title', () => {
    beforeAll(async () => {
      findOne.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      findOne.mockResolvedValueOnce(null);
      const req = { params: { headline: 'title-unknown' } };
      await getArticle(req, res);
    });

    it('should find article with headline', () => {
      expect(findOne).toHaveBeenCalledWith('news', { headline: 'title unknown' });
    });

    it('should return 204 status', () => {
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('when there is a news item error', () => {
    beforeAll(async () => {
      res.end.mockClear();
      res.status.mockClear();
      findOne.mockRejectedValueOnce(new Error());
      const req = { params: { headline: 'title' } };
      await getArticle(req, res);
    });

    it('should return 500 status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
