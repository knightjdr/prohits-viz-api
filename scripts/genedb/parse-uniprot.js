import fs from 'fs';
import readline from 'readline';

const splitField = value => value.split('; ').filter(Boolean);

const parseUniprot = file => (
  new Promise((resolve, reject) => {
    const geneIDs = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const uniprotacc = fields[0];
        const uniprotid = fields[1];
        const refseqp = splitField(fields[3]);
        const ensemblp = splitField(fields[20]);

        geneIDs[uniprotacc] = {
          ensemblp,
          refseqp,
          uniprotid,
        };
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      resolve(geneIDs);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

export default parseUniprot;
