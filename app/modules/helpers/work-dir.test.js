const fs = require('fs');

const WorkDir = require('./work-dir');

describe('Working directory generation', () => {
  it('should generate a directory', () => {
    const workingDir = WorkDir();
    expect(fs.existsSync(workingDir)).toBeTruthy();
    fs.rmdirSync(workingDir);
  });
});
