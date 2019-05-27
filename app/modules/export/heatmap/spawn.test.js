const mockSpawn = require('mock-spawn');

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

const spawnProcess = require('./spawn');

const socket = {
  emit: jest.fn(),
};

describe('Spawning the export process', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      socket.emit.mockClear();
      testSpawn.setDefault(testSpawn.simple(0));
      spawnProcess(socket, 'tmp/workDir', 'svg')
        .then(() => {
          done();
        });
    });

    it('should call socket emit with task path ', () => {
      expect(socket.emit).toHaveBeenCalledWith('action', { task: 'workDir', type: 'SAVED_IMAGE' });
    });
  });

  it('should reject with an error on exit', () => {
    const err = new Error('error');
    testSpawn.setDefault(testSpawn.simple(err));
    return expect(spawnProcess(socket, 'tmp/workDir', 'svg')).rejects.toEqual(err);
  });

  it('should reject with a runtime panic error', () => {
    const err = new Error('spawn ENOENT');
    testSpawn.setDefault(function error(cb) {
      this.emit('error', err);
      setTimeout(() => cb(8), 10);
    });
    return expect(spawnProcess(socket, 'tmp/workDir', 'svg')).rejects.toEqual(err);
  });
});
