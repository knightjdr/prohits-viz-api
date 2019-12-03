const events = require('events');
const socketIo = require('socket.io');

const configureSocket = require('./configure-socket');

jest.mock('socket.io');
const io = new events.EventEmitter();
socketIo.mockReturnValue(io);

const app = {
  get: function getAppValue(key) {
    return this[key];
  },
  set: function setAppValue(key, value) {
    this[key] = value;
  },
};

describe('Configure socket', () => {
  describe('socket setup', () => {
    beforeAll(() => {
      socketIo.mockClear();
      configureSocket(app, 'server');
    });

    it('should setup socket', () => {
      expect(socketIo).toHaveBeenCalledWith('server', { path: '/ws' });
    });

    it('should initialize sessions', () => {
      expect(app.sessions).toEqual([]);
    });

    it('should define app socket', () => {
      expect(app.socketio).toEqual(io);
    });
  });

  describe('socket connection', () => {
    let client;

    beforeAll(() => {
      app.sessions = [];
      client = new events.EventEmitter();
      client.emit = jest.fn();
      client.id = 'id1';
      io.emit('connection', client);
    });

    it('should add socket ID to sessions on connection', () => {
      const expected = ['id1'];
      expect(app.sessions).toEqual(expected);
    });

    it('should emit client action', () => {
      expect(client.emit).toHaveBeenCalledWith('action', { id: 'id1', type: 'SET_SESSION_ID' });
    });
  });

  describe('client disconnect', () => {
    let client;

    beforeAll(() => {
      app.sessions = [];
      client = new events.EventEmitter();
      client.id = 'id1';
      io.emit('connection', client);
    });

    it('should add socket ID to sessions on connection', () => {
      const expected = ['id1'];
      expect(app.sessions).toEqual(expected);
    });

    it('should remove id on disconnect', () => {
      client.emit('disconnect');
      expect(app.sessions).toEqual([]);
    });
  });
});
