import mockSpawn from 'mock-spawn';

import spawnProcess from './spawn.js';

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

describe('Spawn utility', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      testSpawn.setDefault(testSpawn.simple(0));
      const command = 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_stats.py -f fdr -s saint.txt';
      await spawnProcess(command, 'workDir/');
    });

    it('should spawn docker command', () => {
      expect(testSpawn.calls[0].command).toBe('docker');
    });

    it('should spawn docker with arguments', () => {
      const expected = [
        'run',
        '-v',
        '$(pwd):/files/',
        'pvutilitiespython',
        '/app/saint_stats.py',
        '-f',
        'fdr',
        '-s',
        'saint.txt',
      ];
      expect(testSpawn.calls[0].args).toEqual(expected);
    });

    it('should spawn docker with cwd option', () => {
      expect(testSpawn.calls[0].opts.cwd).toBe('workDir/');
    });
  });

  it('should resolve on error', () => {
    const err = new Error('spawn ENOENT');
    testSpawn.setDefault(function error(cb) {
      this.emit('error', err);
      setTimeout(() => cb(8), 10);
    });
    return expect(spawnProcess('workDir/')).resolves.toBe('Error: spawn ENOENT');
  });
});
