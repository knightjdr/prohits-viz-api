/* eslint no-console: 0 */
import fs from 'fs/promises';

import createFolder from '../utils/create-folder.js';
import download from './download.js';
import getVersion from './get-version.js';
import parseDomains from './parse-domains.js';

const DOWNLOAD_FOLDER = './scripts/domains/downloads/';
const OUTFILE = './files/unmapped/domains.json';
const OUTFILE_VERSIONS = './scripts/domains/downloads/versions.json';

const downloadDomains = async () => {
  try {
    await createFolder(DOWNLOAD_FOLDER);

    const domainFile = await download(DOWNLOAD_FOLDER);
    const version = await getVersion(domainFile);
    console.log(`Downloaded PFAM domains version ${version}`);

    const domains = await parseDomains(domainFile);

    await fs.writeFile(OUTFILE, JSON.stringify(domains, null, 2));
    await fs.writeFile(OUTFILE_VERSIONS, JSON.stringify({ pfam: version }, null, 2));
  } catch (error) {
    console.error(error);
  }
};

export default downloadDomains;
