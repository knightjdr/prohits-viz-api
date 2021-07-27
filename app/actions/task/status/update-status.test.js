import exists from './task-exists.js';
import logger from '../../../helpers/logging/logger.js';
import status from './task-status.js';
import updateStatus from './update-status.js';

jest.mock('../../../helpers/logging/logger.js');
jest.mock('./task-exists');
jest.mock('./task-status');
status.mockResolvedValue({
  test1: { date: 1, status: 'complete' },
  test2: { date: 2, status: 'running' },
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
        tasks: {
          test1: { date: 1, status: 'complete' },
          test2: { date: 2, status: 'running' },
        },
      };
      expect(res.send).toHaveBeenCalledWith(expected);
    });
  });

  describe('unsuccessfully', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      exists.mockImplementation(() => {
        throw new Error('cannot access file system');
      });
      await updateStatus(req, res);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('update task status - Error: cannot access file system');
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
