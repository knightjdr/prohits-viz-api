/* eslint global-require: "off" */
const Database = require('./database');
const Init = require('./init');
const Logger = require('../../logger');

const err = new Error('err');
// mock init
jest.mock('./init');

// mock logger
jest.mock('../../logger');
Logger.error = jest.fn();
Logger.info = jest.fn();

afterEach(() => {
  Database.client = null;
  Database.connection = null;
  Logger.error.mockClear();
  Logger.info.mockClear();
});

describe('Database connection', () => {
  describe('with successful connection', () => {
    beforeAll(() => {
      Init.mockResolvedValue({ client: 'client', db: 'database' });
    });

    it('should resolve', () => {
      Database.init()
        .then(() => {
          expect(Database.connection).toBe('database');
        });
    });
  });

  describe('with unsuccesful connection', () => {
    beforeAll(() => {
      Init.mockRejectedValue(err);
    });

    it('reject unsuccessful connection', () => {
      Database.init()
        .catch(() => {
          expect(Database.connection).toBeNull();
        });
    });
  });

  describe('on closing', () => {
    describe('when connection exists', () => {
      beforeAll(() => {
        // create mock resolved value for mongoDB connection with close method
        const client = {
          close: () => (new Promise((resolve) => { resolve(); })),
        };
        Init.mockResolvedValue({ client, db: 'database' });
        return Database.init();
      });

      it('should close successfully', () => {
        Database.close().then(() => {
          expect(Database.client).toBeNull();
          expect(Database.connection).toBeNull();
          expect(Logger.info).toBeCalled();
        });
      });
    });

    describe('fail when connection exists', () => {
      // create mock rejected value for mongoDB connection with close method
      const client = {
        close: () => (new Promise((resolve, reject) => { reject(); })),
      };

      beforeAll(() => {
        Init.mockResolvedValue({ client, db: 'database' });
        return Database.init();
      });

      it('should occur gracefully', () => {
        Database.close().catch(() => {
          expect(Database.client).toEqual(client);
          expect(Database.connection).toBe('database');
          expect(Logger.error).toBeCalled();
        });
      });
    });

    describe('when connection does not exist', () => {
      it('should close successfully', () => {
        Database.close().then(() => {
          expect(Database.client).toBeNull();
          expect(Database.connection).toBeNull();
          expect(Logger.info).not.toBeCalled();
          expect(Logger.error).not.toBeCalled();
        });
      });
    });
  });
});
