import fs from 'fs/promises';

import config from '../../../config/config.js';

const addFile = async (filename, workDir) => {
  const source = `${process.cwd()}/${config.dataDir}${filename}`;
  const target = `${workDir}/helper-files/${filename}`;
  await fs.symlink(source, target);
  return `helper-files/${filename}`;
};

const addUserFileName = (value, name) => {
  if (Array.isArray(value) && value.length > 0) {
    return name;
  }
  return '';
};

const addKnownnessFile = async (knownOption, customFile, workDir) => {
  if (knownOption === 'interaction') {
    return addFile('interactions.json', workDir);
  } if (knownOption === 'custom') {
    return addUserFileName(customFile, 'helper-files/knownness.txt');
  }
  return '';
};

const defineUserIndependentSettings = async (settings, workDir) => {
  const {
    conditionMapFile,
    known,
    knownFile,
    proteinTissues,
    readoutMapFile,
    rnaTissues,
    type: tool,
  } = settings;

  if (tool === 'scv') {
    const files = await Promise.all([
      addFile('gene-db.json', workDir),
      proteinTissues.length > 0 ? addFile('protein-expression.json', workDir) : '',
      rnaTissues.length > 0 ? addFile('rna-expression.json', workDir) : '',
      addKnownnessFile(known, knownFile, workDir),
    ]);

    return {
      conditionMapFile: addUserFileName(conditionMapFile, 'helper-files/condition-map.txt'),
      geneFile: files[0],
      knownFile: files[3],
      proteinExpressionFile: files[1],
      readoutMapFile: addUserFileName(readoutMapFile, 'helper-files/readout-map.txt'),
      rnaExpressionFile: files[2],
    };
  }

  return {};
};

export default defineUserIndependentSettings;
