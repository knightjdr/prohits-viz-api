import fs from 'fs';
import readline from 'readline';

const parseIntact = infile => (
  new Promise((resolve, reject) => {
    const geneRegex = new RegExp(/entrezgene\/locuslink:(\d+)/);
    const speciesRegex = new RegExp(/taxid:(\d+)/);

    const interactions = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(infile),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const genesA = fields[22].match(geneRegex);
        const genesB = fields[23].match(geneRegex);
        if (genesA && genesB) {
          const [, geneA] = genesA;
          const [, geneB] = genesB;
          const organismsA = fields[9].match(speciesRegex);
          const organismsB = fields[10].match(speciesRegex);
          if (organismsA && organismsB && organismsA[1] === '9606' && organismsB[1] === '9606') {
            if (!interactions[geneA]) {
              interactions[geneA] = {};
            }
            if (!interactions[geneB]) {
              interactions[geneB] = {};
            }
            interactions[geneA][geneB] = 1;
            interactions[geneB][geneA] = 1;
          }
        }
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      resolve(interactions);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

export default parseIntact;
