const mockSpawn = require('mock-spawn');

const flags = require('./spawn-flags');

jest.mock('./spawn-flags');
flags.mockReturnValue(['-arg1']);

// Mock spawn.
const testSpawn = mockSpawn();
require('child_process').spawn = testSpawn;

const spawnProcess = require('./spawn');

const form = {
  field: 1,
};

describe('Spawn dotplot analysis', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      flags.mockClear();
      testSpawn.setDefault(testSpawn.simple(0));
      spawnProcess(form, 'workDir/')
        .then(() => {
          done();
        });
    });

    it('should process flags', () => {
      expect(flags).toHaveBeenCalledWith(form);
    });

    it('should spawn pvanalyze', () => {
      expect(testSpawn.calls[0].command).toBe('pvanalyze');
    });

    it('should spawn pvanalyze with flags', () => {
      expect(testSpawn.calls[0].args).toEqual(['-arg1']);
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
    return expect(spawnProcess(form, 'workDir/')).resolves.toBeUndefined();
  });
});
