const database = require('./database');
const init = require('./init');

// mock init
jest.mock('./init');

describe('database connection', () => {
  describe('with successful connection', () => {
    afterAll(() => {
      database.client = null;
      database.connection = null;
    });

    beforeAll(async () => {
      init.mockResolvedValue({ client: 'client', db: 'database' });
      await database.init();
    });

    it('should set client', () => {
      expect(database.client).toBe('client');
    });

    it('should set connection', () => {
      expect(database.connection).toBe('database');
    });
  });

  describe('on closing', () => {
    describe('when connection exists', () => {
      let close;

      afterAll(() => {
        database.client = null;
        database.connection = null;
      });

      beforeAll(async () => {
        close = jest.fn();
        database.client = { close };
        database.connection = 'connection';
        await database.close();
      });

      it('should close client', () => {
        expect(close).toHaveBeenCalled();
      });

      it('should unset client', async () => {
        expect(database.client).toBeNull();
      });

      it('should unset connection', async () => {
        expect(database.connection).toBeNull();
      });
    });

    describe('when connection does not exist', () => {
      it('should not call close', () => {
        const close = jest.fn();
        database.client = { close };
        database.connection = null;
        expect(close).not.toHaveBeenCalled();
      });
    });
  });
});
