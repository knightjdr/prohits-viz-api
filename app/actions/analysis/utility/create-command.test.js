import createCommand from './create-command.js';

describe('Create utility script command', () => {
  it('should create the command for crispr_convert', () => {
    const fields = {
      files: ['condition1.txt', 'condition2.txt'],
      tool: 'bagel',
      utility: 'crispr_convert',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/crispr_convert/main.py '
      + '-f files -t bagel';
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

  it('should create the command for saint_biogrid_network', () => {
    const fields = {
      evidenceList: ['affinity capture-ms', 'fret'],
      fdr: 0.05,
      files: ['file.txt'],
      idType: 'symbol',
      includeEvidence: false,
      includePrimaryInteractions: true,
      includeSecondaryInteractions: false,
      includeSaintInteractions: true,
      interSpeciesExcluded: false,
      max: 10000,
      selfInteractionsExcluded: true,
      throughputTag: 'all',
      utility: 'saint_biogrid_network',
    };
    const additionalSettings = {
      accessKey: 'abc123',
      geneFile: 'helper-files/gene-db.json',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/text_biogrid_network/main.py '
      + '-k abc123 -el "affinity capture-ms|fret" -f "file.txt" '
      + '-fdr 0.05 -it symbol -ie false '
      + '-ipi true -isi false -isai true '
      + '-ise false -is true -g "helper-files/gene-db.json" '
      + '-m 10000 -tt all';
    expect(createCommand({ ...fields, ...additionalSettings })).toBe(expected);
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
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/saint_domain_enrich/main.py '
      + '-b all -f 0.01 -i refseqp -s "file.txt" -t 0 -d "helper-files/domains.json" -g "helper-files/gene-db.json"';
    expect(createCommand({ ...fields, ...additionalSettings })).toBe(expected);
  });

  it('should create the command for saint_fea', () => {
    const fields = {
      files: ['file.txt'],
      fdr: 0.01,
      topPreys: 0,
      utility: 'saint_fea',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/saint_fea/main.py -f 0.01 -s "file.txt" -t 0';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for saint_specificity', () => {
    const fields = {
      controlSubtract: true,
      files: ['file.txt'],
      metric: 'fe',
      utility: 'saint_specificity',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/saint_specificity/main.py -c true -m fe -s "file.txt"';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for saint_stats', () => {
    const fields = {
      files: ['file.txt'],
      fdr: 0.01,
      utility: 'saint_stats',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/saint_stats/main.py -f 0.01 -s "file.txt"';
    expect(createCommand(fields)).toBe(expected);
  });

  it('should create the command for text_biogrid_network', () => {
    const fields = {
      evidenceList: ['affinity capture-ms', 'fret'],
      files: ['file.txt'],
      idType: 'symbol',
      includeEvidence: false,
      includePrimaryInteractions: true,
      includeSecondaryInteractions: false,
      interSpeciesExcluded: false,
      max: 10000,
      selfInteractionsExcluded: true,
      throughputTag: 'all',
      utility: 'text_biogrid_network',
    };
    const additionalSettings = {
      accessKey: 'abc123',
      geneFile: 'helper-files/gene-db.json',
    };
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/text_biogrid_network/main.py '
      + '-k abc123 -el "affinity capture-ms|fret" -f "file.txt" '
      + '-it symbol -ie false '
      + '-ipi true -isi false '
      + '-ise false -g "helper-files/gene-db.json" '
      + '-m 10000 -tt all';
    expect(createCommand({ ...fields, ...additionalSettings })).toBe(expected);
  });

  it('should create the command for text_symbol_fix', () => {
    const fields = {
      columns: ['column1', 'column2'],
      files: ['file.txt'],
      utility: 'text_symbol_fix',
    };
    const additionalSettings = {};
    const expected = 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
      + 'pvutilitiespython /app/text_symbol_fix/main.py '
      + '-c "column1|column2" -f "file.txt"';
    expect(createCommand({ ...fields, ...additionalSettings })).toBe(expected);
  });
});
