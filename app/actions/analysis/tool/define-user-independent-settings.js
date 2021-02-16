import fs from 'fs/promises';

import config from '../../../config/config.js';

const addFile = async (filename, workDir) => {
  const source = `${config.dataDir}${filename}`;
  const target = `${workDir}/helper-files/${filename}`;
  await fs.symlink(source, target);
  return target;
};

const defineUserIndependentSettings = async (settings, workDir) => {
  const {
    known,
    proteinTissues,
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
      geneFile: files[0],
      knownFile: files[1],
      proteinExpressionFile: files[2],
      rnaExpressionFile: files[3],
    };
  }

  return {};
};

export default defineUserIndependentSettings;
