import fs from 'fs/promises';

import config from '../../../config/config.js';

const addFile = async (filename, workDir) => {
  const source = `${process.cwd()}/${config.dataDir}${filename}`;
  const target = `${workDir}/helper-files/${filename}`;
  await fs.copyFile(source, target);
  return `helper-files/${filename}`;
};

const defineUserIndependentSettings = async (tool, workDir) => {
  if (tool === 'saint_domain_enrich') {
    const files = await Promise.all([
      addFile('domains.json', workDir),
      addFile('gene-db.json', workDir),
    ]);

    return {
      domainFile: files[0],
      geneFile: files[1],
    };
  } if (tool === 'saint_biogrid_network' || tool === 'text_biogrid_network') {
    const geneFile = await addFile('gene-db.json', workDir);

    return {
      accessKey: config.biogridKey,
      geneFile,
    };
  }

  return {};
};

export default defineUserIndependentSettings;
