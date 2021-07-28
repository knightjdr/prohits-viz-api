import insert from '../../helpers/database/insert.js';
import logger from '../../helpers/logging/logger.js';
import logTasks from './log-tasks.js';

jest.mock('../../helpers/database/insert');
jest.mock('../../helpers/logging/logger.js');
jest.mock('../../utils/url-details', () => () => ({ host: 'test.org' }));

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.toISOString = origDate.toISOString;

const next = jest.fn();

afterAll(() => {
  global.Date = origDate;
});

describe('Log tasks', () => {
  describe('with file', () => {
    describe('with tool specified', () => {
      beforeAll(() => {
        insert.mockClear();
        next.mockClear();
        const req = {
          files: {
            file: [
              { originalname: 'file1.txt', size: 1000 },
            ],
          },
          params: { tool: 'dotplot' },
          path: '/analysis/dotplot',
        };
        logTasks(req, {}, next);
      });

      it('should call insert', () => {
        const document = {
          date: new Date().toISOString(),
          file: true,
          fileSize: 1000,
          origin: 'test.org',
          path: '/analysis/dotplot',
          tool: 'dotplot',
        };
        expect(insert).toHaveBeenCalledWith('tracking', document);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });

    describe('missing tool name', () => {
      beforeAll(() => {
        insert.mockClear();
        next.mockClear();
        const req = {
          get: () => 'test.org',
          files: {
            file: [
              { originalname: 'file1.txt', size: 1000 },
            ],
          },
          params: undefined,
          path: '/analysis/dotplot',
        };
        logTasks(req, {}, next);
      });

      it('should call insert', () => {
        const document = {
          date: new Date().toISOString(),
          file: true,
          fileSize: 1000,
          origin: 'test.org',
          path: '/analysis/dotplot',
          tool: '',
        };
        expect(insert).toHaveBeenCalledWith('tracking', document);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('with only sample file', () => {
    beforeAll(() => {
      insert.mockClear();
      next.mockClear();
      const req = {
        get: () => 'test.org',
        files: {
          file: [
            { originalname: 'samplefile.txt', size: 0 },
          ],
        },
        params: { tool: 'dotplot' },
        path: '/analysis/dotplot',
      };
      logTasks(req, {}, next);
    });

    it('should call insert', () => {
      const document = {
        date: new Date().toISOString(),
        file: false,
        fileSize: 0,
        origin: 'test.org',
        path: '/analysis/dotplot',
        tool: 'dotplot',
      };
      expect(insert).toHaveBeenCalledWith('tracking', document);
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('with multiple files', () => {
    beforeAll(() => {
      insert.mockClear();
      next.mockClear();
      const req = {
        get: () => 'test.org',
        files: {
          file: [
            { originalname: 'samplefile.txt', size: 0 },
            { originalname: 'file1.txt', size: 1000 },
            { originalname: 'file2.txt', size: 1000 },
          ],
        },
        params: { tool: 'dotplot' },
        path: '/analysis/dotplot',
      };
      logTasks(req, {}, next);
    });

    it('should call insert', () => {
      const document = {
        date: new Date().toISOString(),
        file: true,
        fileSize: 2000,
        origin: 'test.org',
        path: '/analysis/dotplot',
        tool: 'dotplot',
      };
      expect(insert).toHaveBeenCalledWith('tracking', document);
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('from third party', () => {
    beforeAll(() => {
      insert.mockClear();
      next.mockClear();
      const req = {
        get: function get(key) { return this.headers[key]; },
        headers: {
          apikey: 'user@email.com:secretApiKey',
        },
        files: {
          file: [
            { originalname: 'file1.txt', size: 1000 },
          ],
        },
        path: '/third-party/viz',
      };
      logTasks(req, {}, next);
    });

    it('should call insert', () => {
      const document = {
        date: new Date().toISOString(),
        file: true,
        fileSize: 1000,
        origin: 'user@email.com',
        path: '/third-party/viz',
        tool: '',
      };
      expect(insert).toHaveBeenCalledWith('tracking', document);
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('with error', () => {
    beforeAll(() => {
      insert.mockImplementation(() => {
        throw new Error('insertion failed');
      });

      logger.error.mockClear();
      next.mockClear();
      const req = {
        files: {
          file: [
            { originalname: 'file1.txt', size: 1000 },
          ],
        },
        params: { tool: 'dotplot' },
        path: '/analysis/dotplot',
      };
      logTasks(req, {}, next);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('log task - Error: insertion failed');
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });
});
