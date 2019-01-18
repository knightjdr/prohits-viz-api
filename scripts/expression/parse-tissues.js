/* eslint no-param-reassign: 0 */

const fs = require('fs');
const readline = require('readline');

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
        const [, gene, cell, tpm] = line.split('\t');
        tissues[cell] = 1;
        stream.write(`${gene}\t${cell}\t${tpm}\n`);
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      stream.end();
      resolve(tissues);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

module.exports = parseTissues;
