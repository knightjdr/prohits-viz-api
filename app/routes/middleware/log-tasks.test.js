import insert from '../../helpers/database/insert';
import logTasks from './log-tasks';

jest.mock('../../helpers/database/insert');
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
    describe('with type', () => {
      beforeAll(() => {
        insert.mockClear();
        next.mockClear();
        const req = {
          files: [
            { originalname: 'file1.txt', size: 1000 },
          ],
          params: { type: 'dotplot' },
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
          type: 'dotplot',
        };
        expect(insert).toHaveBeenCalledWith('tracking', document);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });

    describe('with no type', () => {
      beforeAll(() => {
        insert.mockClear();
        next.mockClear();
        const req = {
          get: () => 'test.org',
          files: [
            { originalname: 'file1.txt', size: 1000 },
          ],
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
          type: '',
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
        files: [
          { originalname: 'samplefile.txt', size: 0 },
        ],
        params: { type: 'dotplot' },
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
        type: 'dotplot',
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
        files: [
          { originalname: 'samplefile.txt', size: 0 },
          { originalname: 'file1.txt', size: 1000 },
          { originalname: 'file2.txt', size: 1000 },
        ],
        params: { type: 'dotplot' },
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
        type: 'dotplot',
      };
      expect(insert).toHaveBeenCalledWith('tracking', document);
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });
});
