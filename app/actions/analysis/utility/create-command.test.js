import createCommand from './create-command.js';

describe('Create utility script command', () => {
  it('should create the command for pvconvert', () => {
    const fields = {
      files: ['file.txt'],
      imageType: 'dotplot',
      utility: 'pvconvert',
    };
    const expected = 'pvconvert --file="file.txt" --imageType="dotplot"';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for saintfea', () => {
    const fields = {
      files: ['file.txt'],
      fdr: 0.01,
      topPreys: 0,
      utility: 'saintfea',
    };
    const expected = 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_fea.py -f 0.01 -s file.txt -t 0';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for saintstats', () => {
    const fields = {
      files: ['file.txt'],
      fdr: 0.01,
      utility: 'saintstats',
    };
    const expected = 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_stats.py -f 0.01 -s file.txt';
    expect(createCommand(fields)).toBe(expected);
  });
});
