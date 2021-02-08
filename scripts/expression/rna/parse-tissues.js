import fs from 'fs';
import readline from 'readline';

import sortArray from '../../utils/sort-array-strings.js';

const parseTissues = (infile, outfile, flags) => (
  new Promise((resolve, reject) => {
    const tissues = {};
    const stream = fs.createWriteStream(outfile, { flags });

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(infile),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const [ensg, , cell, tpm] = line.split('\t');
        tissues[cell] = true;
        stream.write(`${ensg}\t${cell}\t${tpm}\n`);
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      stream.end();
      stream.on('finish', () => {
        const tissueArr = Object.keys(tissues);
        sortArray(tissueArr);
        resolve(tissueArr);
      });
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

export default parseTissues;
