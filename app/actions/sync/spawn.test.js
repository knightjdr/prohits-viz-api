import mockSpawn from 'mock-spawn';
import rimraf from 'rimraf';

import spawnProcess from './spawn';

jest.mock('rimraf');

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

const socket = {
  emit: jest.fn(),
};

describe('Spawning the sync process', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      socket.emit.mockClear();
      testSpawn.setDefault(testSpawn.simple(0, 'url'));
      await spawnProcess(socket, 'testdir/', 'id');
    });

    it('should call socket emit with url written to stdout', () => {
      expect(socket.emit).toHaveBeenCalledWith('action', { snapshotID: 'id', syncedImage: 'url', type: 'MINIMAP_SYNCHED' });
    });

    it('should call rimraf to remove testdir', () => {
      expect(rimraf).toHaveBeenCalled();
      expect(rimraf.mock.calls[0][0]).toBe('testdir/');
    });
  });

  it('should reject with an error on exit', () => {
    const err = new Error('error');
    testSpawn.setDefault(testSpawn.simple(err));
    return expect(spawnProcess(socket, 'testdir/', 'id')).rejects.toEqual(err);
  });

  it('should reject with a runtime panic error', () => {
    const err = new Error('spawn ENOENT');
    testSpawn.setDefault(function error(cb) {
      this.emit('error', err);
      setTimeout(() => cb(8), 10);
    });
    return expect(spawnProcess(socket, 'testdir/', 'id')).rejects.toEqual(err);
  });
});
