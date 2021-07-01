import mockSpawn from 'mock-spawn';

import spawnProcess from './spawn.js';

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

describe('Spawn dotplot analysis', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      testSpawn.setDefault(testSpawn.simple(0));
      await spawnProcess('workDir/');
    });

    it('should spawn pvanalyze', () => {
      expect(testSpawn.calls[0].command).toBe('pvanalyze');
    });

    it('should spawn pvanalyze with flags', () => {
      expect(testSpawn.calls[0].args).toEqual(['--settings', 'settings.json']);
    });

    it('should spawn pvanalyze with cwd option', () => {
      expect(testSpawn.calls[0].opts.cwd).toBe('workDir/');
    });
  });

  it('should resolve on error', () => {
    const err = new Error('spawn ENOENT');
    testSpawn.setDefault(function error(cb) {
      this.emit('error', err);
      setTimeout(() => cb(8), 10);
    });
    return expect(spawnProcess('workDir/')).resolves.toBeUndefined();
  });
});
