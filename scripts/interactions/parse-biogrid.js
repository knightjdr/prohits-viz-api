import fs from 'fs';
import readline from 'readline';

const parseBiogrid = infile => (
  new Promise((resolve, reject) => {
    const interactions = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(infile),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const geneA = fields[1];
        const geneB = fields[2];
        const organismA = fields[35];
        const organismB = fields[36];
        if (organismA === '9606' && organismB === '9606') {
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

export default parseBiogrid;
