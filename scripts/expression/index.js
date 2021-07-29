/* eslint no-console: 0 */
import mkdirp from 'mkdirp';
import fs from 'fs/promises';

import protein from './protein/protein.js';
import rna from './rna/rna.js';

const DOWNLOAD_FOLDER = './scripts/expression/downloads/';
const OUTFILE_VERSIONS = './scripts/expression/downloads/versions.json';

const downloadExpression = async () => {
  try {
    await mkdirp(DOWNLOAD_FOLDER);

    const versions = await Promise.all([
      protein(DOWNLOAD_FOLDER),
      rna(DOWNLOAD_FOLDER),
    ]);
    console.log(`Downloading ProteomicsDB version ${versions[0]} and HPA version ${versions[1]}`);

    await fs.writeFile(OUTFILE_VERSIONS, JSON.stringify({ proteomicsdb: versions[0], hpa: versions[1] }, null, 2));
  } catch (error) {
    console.error(error);
  }
};

export default downloadExpression;
