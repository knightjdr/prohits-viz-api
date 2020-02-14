import mockSpawn from 'mock-spawn';

import spawnProcess from './spawn.js';

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

const socket = {
  emit: jest.fn(),
};

describe('Spawning the export process', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      socket.emit.mockClear();
      testSpawn.setDefault(testSpawn.simple(0));
      const options = {
        font: 'font.ttf',
        format: 'svg',
        imageType: 'heatmap',
        targetFile: 'workDir/svg/heatmap.svg',
        workingDir: 'workDir',
      };
      await spawnProcess(socket, options);
    });

    it('should call socket emit with download file', () => {
      expect(socket.emit).toHaveBeenCalledWith('action', { file: 'workDir/svg/heatmap.svg', type: 'DOWNLOAD_EXPORT_IMAGE' });
    });
  });

  it('should reject with an error on exit', () => {
    const err = new Error('error');
    testSpawn.setDefault(testSpawn.simple(err));
    return expect(spawnProcess(socket, {})).rejects.toEqual(err);
  });

  it('should reject with a runtime panic error', () => {
    const err = new Error('spawn ENOENT');
    testSpawn.setDefault(function error(cb) {
      this.emit('error', err);
      setTimeout(() => cb(8), 10);
    });
    return expect(spawnProcess(socket, {})).rejects.toEqual(err);
  });
});
