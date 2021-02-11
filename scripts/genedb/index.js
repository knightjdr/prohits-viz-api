/* eslint no-console: 0 */

import download from './download.js';
import parseHGNC from './parse-hgnc.js';
import parseUniprot from './parse-uniprot.js';
import writeData from './write-data.js';

const main = async () => {
  try {
    // await download();
    const [hgnc, uniprot] = await Promise.all([
      parseHGNC('./downloads/hgnc.json'),
      parseUniprot('./downloads/uniprot.tab'),
    ]);
    await writeData({ hgnc, uniprot }, '../../files/gene-db.json');
  } catch (error) {
    console.error(error);
  }
};

main();
