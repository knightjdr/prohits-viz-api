const mockSpawn = require('mock-spawn');
const rimraf = require('rimraf');

jest.mock('rimraf');

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

const spawnProcess = require('./spawn');

const socket = {
  emit: jest.fn(),
};

describe('Spawning the sync process', () => {
  describe('with a successfully completed run', () => {
    beforeAll(async (done) => {
      socket.emit.mockClear();
      testSpawn.setDefault(testSpawn.simple(0, 'url'));
      spawnProcess(socket, 'testdir/')
        .then(() => {
          done();
        });
    });

    it('should call socket emit with url written to stdout', () => {
      expect(socket.emit).toHaveBeenCalledWith('action', { syncImage: 'url', type: 'MAP_SYNCHED' });
    });

    it('should call rimraf to remove testdir', () => {
      expect(rimraf).toHaveBeenCalled();
      expect(rimraf.mock.calls[0][0]).toBe('testdir/');
    });
  });

  describe('with an error on exit', () => {
    beforeAll(async (done) => {
      socket.emit.mockClear();
      testSpawn.setDefault(testSpawn.simple(1));
      spawnProcess(socket, 'testdir/')
        .then(() => {
          done();
        });
    });

    it('should call socket emit with error action', () => {
      expect(socket.emit).toHaveBeenCalledWith('action', { type: 'SYNC_ERROR' });
    });
  });

  describe('with a runtime panic error', () => {
    beforeAll(async (done) => {
      socket.emit.mockClear();
      testSpawn.setDefault(function error(cb) {
        this.emit('error', new Error('spawn ENOENT'));
        setTimeout(() => cb(8), 10);
      });
      spawnProcess(socket, 'testdir/')
        .then(() => {
          done();
        });
    });

    it('should call socket emit with error action', () => {
      expect(socket.emit).toHaveBeenCalledWith('action', { type: 'SYNC_ERROR' });
    });
  });
});
