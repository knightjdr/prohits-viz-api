const arrSortByKey = require('../helpers/arr-sort-by-key');
const exists = require('./task-exists');
const status = require('./task-status');
const task = require('./task');

jest.mock('../helpers/arr-sort-by-key');
arrSortByKey.mockReturnValue([
  { date: 1, id: 'test1', status: 'complete' },
  { date: 2, id: 'test2', status: 'running' },
]);
jest.mock('./task-exists');
jest.mock('./task-status');
status.mockResolvedValue({
  list: ['test1', 'test2'],
  status: [
    { date: 1, id: 'test1', status: 'complete' },
    { date: 2, id: 'test2', status: 'running' },
  ],
});

const req = {
  body: {
    tasks: ['test1', 'test2'],
  },
};
const res = {
  end: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
};

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Task information', () => {
  describe('successfully resolves', () => {
    beforeAll(async (done) => {
      res.send.mockClear();
      exists.mockResolvedValue();
      task(req, res);
      await sleep(200);
      done();
    });

    it('should send response with status status', () => {
      const expected = {
        list: ['test1', 'test2'],
        status: [
          { date: 1, id: 'test1', status: 'complete' },
          { date: 2, id: 'test2', status: 'running' },
        ],
      };
      expect(res.send).toHaveBeenCalledWith(expected);
    });
  });

  describe('rejects', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      res.status.mockClear();
      exists.mockRejectedValue();
      task(req, res);
      await sleep(200);
      done();
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
