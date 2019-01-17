/* eslint no-param-reassign: 0 */

const fs = require('fs');
const readline = require('readline');

const parseBiogrid = taxon => (
  new Promise((resolve, reject) => {
    const species = {};
    const stream = fs.createWriteStream('../../files/interactors.txt', { flags: 'w' });

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream('./downloads/biogrid.tab'),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const geneA = fields[7];
        const geneB = fields[8];
        const organismA = taxon[fields[15]];
        const organismB = taxon[fields[16]];
        species[organismA] = 1;
        species[organismB] = 1;
        stream.write(`${geneA}\t${geneB}\t${organismA}\t${organismB}\n`);
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      stream.end();
      resolve(species);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

module.exports = parseBiogrid;
