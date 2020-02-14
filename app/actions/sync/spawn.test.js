import mockSpawn from 'mock-spawn';

import removeFile from '../../helpers/files/remove-file.js';
import spawnProcess from './spawn.js';

jest.mock('../../helpers/files/remove-file.js');
jest.mock('fs', () => ({
  promises: {
    readFile: () => 'dGVzdA==',
  },
}));

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
      const uri = 'data:image/png;base64,dGVzdA==';
      expect(socket.emit).toHaveBeenCalledWith('action', { snapshotID: 'id', syncedImage: uri, type: 'MINIMAP_SYNCHED' });
    });

    it('should call removeFile to remove testdir', () => {
      expect(removeFile).toHaveBeenCalledWith('testdir/');
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
