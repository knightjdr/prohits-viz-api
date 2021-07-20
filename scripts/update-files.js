/* eslint no-console: 0 */
import fs from 'fs';

import readJson from '../app/utils/read-json.js';
import downloadDomains from './domains/index.js';
import downloadExpression from './expression/index.js';
import downloadInteractions from './interactions/index.js';
import mapGeneIDs from './genedb/index.js';

const writeVersions = async (versions, outfile) => (
  new Promise((resolve) => {
    const stream = fs.createWriteStream(outfile);

    const databases = new Map([
      ['biogrid', 'BioGrid'],
      ['hgnc', 'HGNC'],
      ['hpa', 'Human Protein Atlas'],
      ['intact', 'Intact'],
      ['pfam', 'Pfam'],
      ['proteomicsdb', 'ProteomicsDB'],
      ['uniprot', 'UniProt'],
    ]);

    stream.write('database\tversion or access date\n');
    databases.forEach((name, database) => {
      stream.write(`${name}\t${versions[database]}\n`);
    });
    stream.end();
    stream.on('finish', () => { resolve(); });
  })
);

const mergeVersions = async () => {
  const folders = ['domains', 'expression', 'genedb', 'interactions'];

  const versions = await Promise.all(folders.map(async folder => (
    readJson(`./scripts/${folder}/downloads/versions.json`)
  )));

  const merged = versions.reduce((accum, version) => ({
    ...accum,
    ...version,
  }), {});

  await writeVersions(merged, './files/versions.txt');
};

// Download and update api files
const update = async () => {
  try {
    await Promise.all([
      downloadDomains(),
      downloadExpression(),
      downloadInteractions(),
    ]);
    await mapGeneIDs();
    await mergeVersions();
  } catch (error) {
    console.log(error);
  }
};

update();
