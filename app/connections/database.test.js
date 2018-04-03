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

describe('database connection', () => {
  beforeAll(() => {
    Init.mockResolvedValue({ client: 'client', db: 'database' });
  });

  test('resolve successful connection', () => {
    Database.init()
      .then(() => {
        expect(Database.connection).toBe('database');
      });
  });
});

describe('database connection', () => {
  beforeAll(() => {
    Init.mockRejectedValue(err);
  });

  test('reject unsuccessful connection', () => {
    Database.init()
      .catch(() => {
        expect(Database.connection).toBeNull();
      });
  });
});

describe('database connection', () => {
  beforeAll(() => {
    // create mock resolved value for mongoDB connection with close method
    const client = {
      close: () => (new Promise((resolve) => { resolve(); })),
    };
    Init.mockResolvedValue({ client, db: 'database' });
    return Database.init();
  });
  test('close successfully when connection exists', () => {
    Database.close().then(() => {
      expect(Database.client).toBeNull();
      expect(Database.connection).toBeNull();
      expect(Logger.info).toBeCalled();
    });
  });
});

describe('database connection', () => {
  // create mock rejected value for mongoDB connection with close method
  const client = {
    close: () => (new Promise((resolve, reject) => { reject(); })),
  };
  beforeAll(() => {
    Init.mockResolvedValue({ client, db: 'database' });
    return Database.init();
  });

  test('fail gracefully when connection exists', () => {
    Database.close().catch(() => {
      expect(Database.client).toEqual(client);
      expect(Database.connection).toBe('database');
      expect(Logger.error).toBeCalled();
    });
  });
});

describe('database connection', () => {
  test('close successfully when connection does not exist', () => {
    Database.close().then(() => {
      expect(Database.client).toBeNull();
      expect(Database.connection).toBeNull();
      expect(Logger.info).not.toBeCalled();
      expect(Logger.error).not.toBeCalled();
    });
  });
});
