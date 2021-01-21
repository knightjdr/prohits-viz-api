import events from 'events';
import { Server as SocketIo } from 'socket.io';

import configureSocket from './configure-socket.js';

const mockIO = new events.EventEmitter();
jest.mock('socket.io', () => ({
  Server: jest.fn().mockImplementation(() => mockIO),
}));

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
      SocketIo.mockClear();
      configureSocket(app, 'server');
    });

    it('should setup socket', () => {
      expect(SocketIo).toHaveBeenCalledWith(
        'server',
        {
          cors: { origin: 'http://localhost:3000' },
          path: '/ws',
        },
      );
    });

    it('should initialize sessions', () => {
      expect(app.sessions).toEqual([]);
    });

    it('should define app socket', () => {
      expect(app.socketio).toEqual(mockIO);
    });
  });

  describe('socket connection', () => {
    let client;

    beforeAll(() => {
      app.sessions = [];
      client = new events.EventEmitter();
      client.emit = jest.fn();
      client.id = 'id1';
      mockIO.emit('connection', client);
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
      mockIO.emit('connection', client);
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
