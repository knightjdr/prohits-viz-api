const fs = require('fs');

const WorkDir = require('./work-dir');

describe('Working directory generation', () => {
  let workingDir;

  beforeAll(async (done) => {
    WorkDir()
      .then((dir) => {
        workingDir = dir;
        done();
      });
  });

  it('should generate a directory', () => {
    expect(fs.existsSync(workingDir)).toBeTruthy();
    fs.rmdirSync(workingDir);
  });
});
