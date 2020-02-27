import exists from './task-exists.js';
import status from './task-status.js';
import updateStatus from './update-status.js';

jest.mock('./task-exists');
jest.mock('./task-status');
status.mockResolvedValue({
  test1: { date: 1, status: 'complete' },
  test2: { date: 2,status: 'running' },
});

const req = {
  params: {
    tasks: 'test1;test2',
  },
};
const res = {
  end: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
};

describe('Task information', () => {
  describe('successfully', () => {
    beforeAll(async () => {
      res.send.mockClear();
      exists.mockResolvedValue();
      await updateStatus(req, res);
    });

    it('should send response with status status', () => {
      const expected = {
        status: {
          test1: { date: 1, status: 'complete' },
          test2: { date: 2,status: 'running' },
        },
      };
      expect(res.send).toHaveBeenCalledWith(expected);
    });
  });

  describe('unsuccessfully', () => {
    beforeAll(async () => {
      res.end.mockClear();
      res.status.mockClear();
      exists.mockRejectedValue();
      await updateStatus(req, res);
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
