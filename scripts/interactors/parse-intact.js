/* eslint no-param-reassign: 0 */

const fs = require('fs');
const readline = require('readline');

const parseIntact = (taxon, infile, outfile) => (
  new Promise((resolve, reject) => {
    const geneRegex = new RegExp(/uniprotkb:([^(]+)\(gene name\)/);
    const speciesRegex = new RegExp(/taxid:(\d+)/);

    const species = {};
    const stream = fs.createWriteStream(outfile, { flags: 'a' });

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(infile),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const genesA = fields[4].match(geneRegex);
        const genesB = fields[5].match(geneRegex);
        if (genesA && genesB) {
          const [, geneA] = genesA;
          const [, geneB] = genesB;
          const organismsA = fields[9].match(speciesRegex);
          const organismsB = fields[10].match(speciesRegex);
          if (organismsA && organismsB) {
            const [, organismA] = organismsA;
            const [, organismB] = organismsB;
            const nameA = taxon[organismA];
            const nameB = taxon[organismB];
            species[nameA] = 1;
            species[nameB] = 1;
            stream.write(`${geneA}\t${geneB}\t${nameA}\t${nameB}\n`);
          }
        }
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

module.exports = parseIntact;
