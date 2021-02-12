/* eslint no-console: 0 */

import download from './download.js';
import mapInteractions from './map-interactions.js';
import mapExpression from './map-expression.js';
import parseHGNC from './parse-hgnc.js';
import parseUniprot from './parse-uniprot.js';
import writeGeneData from './write-gene-data.js';

const main = async () => {
  try {
    await download();
    const [hgnc, uniprot] = await Promise.all([
      parseHGNC('./downloads/hgnc.json'),
      parseUniprot('./downloads/uniprot.tab'),
    ]);

    await writeGeneData({ hgnc, uniprot }, '../../files/gene-db.json');

    // Map identifiers in other files
    await Promise.all([
      mapInteractions(
        '../../files/unmapped/interactions.json',
        '../../files/interactions.json',
        hgnc,
      ),
      mapExpression(
        '../../files/unmapped/protein-expression.json',
        '../../files/protein-expression.json',
        hgnc,
        'uniprotacc',
      ),
      mapExpression(
        '../../files/unmapped/rna-expression.json',
        '../../files/rna-expression.json',
        hgnc,
        'ensemblg',
      ),
    ]);
  } catch (error) {
    console.error(error);
  }
};

main();
