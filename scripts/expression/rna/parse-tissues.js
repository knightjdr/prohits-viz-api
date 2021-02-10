import fs from 'fs';
import readline from 'readline';

import sortArray from '../../utils/sort-array-strings.js';

const parseTissues = infile => (
  new Promise((resolve, reject) => {
    const expression = {};
    const tissues = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(infile),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const [ensg, , cell, tpm] = line.split('\t');
        tissues[cell] = true;

        if (!expression[ensg]) {
          expression[ensg] = {};
        }
        expression[ensg][cell] = Number(tpm);
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      const tissueArr = Object.keys(tissues);
      sortArray(tissueArr);
      resolve({ expression, tissues: tissueArr });
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

export default parseTissues;
