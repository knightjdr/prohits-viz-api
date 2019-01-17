/* eslint no-param-reassign: 0 */

const fs = require('fs');
const readline = require('readline');

const parseTaxonomy = () => (
  new Promise((resolve, reject) => {
    const taxonIds = {};
    const lineReader = readline.createInterface({
      input: fs.createReadStream('./downloads/taxonomy/names.dmp'),
    });
    lineReader.on('line', (line) => {
      if (line.includes('scientific name')) {
        const [id, , species] = line.split('\t');
        taxonIds[id] = species;
      }
    });
    lineReader.on('close', () => {
      resolve(taxonIds);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

module.exports = parseTaxonomy;
