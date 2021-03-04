import fs from 'fs/promises';

import config from '../../../config/config.js';

const addFile = async (filename, workDir) => {
  const source = `${process.cwd()}/${config.dataDir}${filename}`;
  const target = `${workDir}/helper-files/${filename}`;
  await fs.symlink(source, target);
  return `helper-files/${filename}`;
};

const addMapFileName = (value, name) => {
  if (Array.isArray(value) && value.length > 0) {
    return name;
  }
  return '';
};

const defineUserIndependentSettings = async (settings, workDir) => {
  const {
    conditionMapFile,
    known,
    proteinTissues,
    readoutMapFile,
    rnaTissues,
    type: tool,
  } = settings;

  if (tool === 'scv') {
    const files = await Promise.all([
      addFile('gene-db.json', workDir),
      known === 'interaction' ? addFile('interactions.json', workDir) : '',
      proteinTissues.length > 0 ? addFile('protein-expression.json', workDir) : '',
      rnaTissues.length > 0 ? addFile('rna-expression.json', workDir) : '',
    ]);

    return {
      conditionMapFile: addMapFileName(conditionMapFile, 'helper-files/condition-map.txt'),
      geneFile: files[0],
      knownFile: files[1],
      proteinExpressionFile: files[2],
      readoutMapFile: addMapFileName(readoutMapFile, 'helper-files/readout-map.txt'),
      rnaExpressionFile: files[3],
    };
  }

  return {};
};

export default defineUserIndependentSettings;
