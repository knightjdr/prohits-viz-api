/* eslint no-console: 0 */
import fs from 'fs/promises';

import download from './download.js';
import getVersions from './get-versions.js';
import mapInteractions from './map-interactions.js';
import mapExpression from './map-expression.js';
import parseHGNC from './parse-hgnc.js';
import parseUniprot from './parse-uniprot.js';
import writeGeneData from './write-gene-data.js';

const DOWNLOAD_FOLDER = './scripts/genedb/downloads/';
const OUTFILE_VERSIONS = './scripts/genedb/downloads/versions.json';

const mapGeneIDs = async () => {
  try {
    const versions = await getVersions();
    console.log(`Downloading HGNC version ${versions.hgnc} and UniProt version ${versions.uniprot}`);

    await download(DOWNLOAD_FOLDER);
    const [hgnc, uniprot] = await Promise.all([
      parseHGNC(`${DOWNLOAD_FOLDER}hgnc.json`),
      parseUniprot(`${DOWNLOAD_FOLDER}uniprot.tab`),
    ]);

    await writeGeneData({ hgnc, uniprot }, './files/gene-db.json');
    await fs.writeFile(OUTFILE_VERSIONS, JSON.stringify(versions, null, 2));

    // Map identifiers in other files
    await Promise.all([
      mapInteractions(
        './files/unmapped/interactions.json',
        './files/interactions.json',
        hgnc,
      ),
      mapExpression(
        './files/unmapped/protein-expression.json',
        './files/protein-expression.json',
        hgnc,
        'uniprotacc',
      ),
      mapExpression(
        './files/unmapped/rna-expression.json',
        './files/rna-expression.json',
        hgnc,
        'ensemblg',
      ),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export default mapGeneIDs;
