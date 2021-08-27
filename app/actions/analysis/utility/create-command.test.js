import createCommand from './create-command.js';

describe('Create utility script command', () => {
  it('should create the command for crispr_convert', () => {
    const fields = {
      files: ['condition1.txt', 'condition2.txt'],
      tool: 'bagel',
      utility: 'crispr_convert',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
      'pvutilitiespython /app/crispr_convert/main.py ' +
      '-f files -t bagel';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for pvconvert', () => {
    const fields = {
      files: ['file.txt'],
      imageType: 'dotplot',
      utility: 'pvconvert',
    };
    const expected = 'pvconvert --file="file.txt" --imageType="dotplot"';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for saint_domain_enrich', () => {
    const fields = {
      background: 'all',
      files: ['file.txt'],
      fdr: 0.01,
      idType: 'refseqp',
      topPreys: 0,
      utility: 'saint_domain_enrich',
    };
    const additionalSettings = {
      domainFile: 'helper-files/domains.json',
      geneFile: 'helper-files/gene-db.json',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
      'pvutilitiespython /app/saint_domain_enrich/main.py ' +
      '-b all -f 0.01 -i refseqp -s file.txt -t 0 -d helper-files/domains.json -g helper-files/gene-db.json';
    expect(createCommand({ ...fields, ...additionalSettings })).toBe(expected);
  });

  it('should create the command for saint_fea', () => {
    const fields = {
      files: ['file.txt'],
      fdr: 0.01,
      topPreys: 0,
      utility: 'saint_fea',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
      'pvutilitiespython /app/saint_fea/main.py -f 0.01 -s file.txt -t 0';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for saint_stats', () => {
    const fields = {
      files: ['file.txt'],
      fdr: 0.01,
      utility: 'saint_stats',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
      'pvutilitiespython /app/saint_stats/main.py -f 0.01 -s file.txt';
    expect(createCommand(fields)).toBe(expected);
  });
});
