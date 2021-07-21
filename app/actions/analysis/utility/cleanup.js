import fs from 'fs/promises';

import config from '../../../config/config.js';
import deleteDirs from '../../../helpers/files/delete-dir.js';

const toolsWithVersioning = ['saint_domain_enrich'];

const cleanup = async (workDir, tool) => {
  if (toolsWithVersioning.includes(tool)) {
    const source = `${process.cwd()}/${config.dataDir}versions.txt`;
    const target = `${workDir}/versions.txt`;
    await fs.copyFile(source, target);
  }

  await deleteDirs(workDir, ['files', 'helper-files']);
};

export default cleanup;
