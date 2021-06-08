/* eslint no-console: 0 */
import fs from 'fs/promises';

import download from './download.js';
import getVersions from './get-versions.js';
import parseBiogrid from './parse-biogrid.js';
import parseIntact from './parse-intact.js';
import writeInteractions from './write-interactions.js';

const BIOGRID_FILE = './scripts/interactions/downloads/biogrid.tab';
const DOWNLOAD_FOLDER = './scripts/interactions/downloads/';
const INTACT_FILE = './scripts/interactions/downloads/intact.tab';
const OUTFILE_INTERACTIONS = './files/unmapped/interactions.json';
const OUTFILE_VERSIONS = './scripts/interactions/downloads/versions.json';

const downloadInteractions = async () => {
  try {
    const versions = await getVersions();
    console.log(`Downloading BioGrid version ${versions.biogrid} and Intact version ${versions.intact}`);

    await download(DOWNLOAD_FOLDER, versions);
    const biogrid = await parseBiogrid(BIOGRID_FILE);
    const intact = await parseIntact(INTACT_FILE);
    await writeInteractions({ biogrid, intact }, OUTFILE_INTERACTIONS);
    await fs.writeFile(OUTFILE_VERSIONS, JSON.stringify(versions, null, 2));
  } catch (error) {
    console.log(error);
  }
};

export default downloadInteractions;
