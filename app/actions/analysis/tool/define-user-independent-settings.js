import fs from 'fs/promises';

import config from '../../../config/config.js';

const defineUserIndependentSettings = async (tool, workDir) => {
  if (tool === 'scv') {
    const dbPath = `${config.dataDir}gene-db.json`;
    const taskPath = `${workDir}/helper-files/gene-db.json`;

    await fs.symlink(dbPath, taskPath);

    return {
      geneDB: taskPath,
    };
  }

  return {};
};

export default defineUserIndependentSettings;
