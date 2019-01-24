/* eslint no-console: 0 */

const download = require('./download');
const parseTissues = require('./parse-tissues');
const writeObjArray = require('../helpers/write-obj-array');

const tissues = { cells: [], tissues: [] };

const cellFile = './downloads/cells.tsv';
const tissueFile = './downloads/tissues.tsv';
const outFile = '../../files/tissues.txt';

download()
  .then(() => parseTissues(cellFile, outFile, 'w'))
  .then((results) => {
    tissues.cells = results;
    return parseTissues(tissueFile, outFile, 'a');
  })
  .then((results) => {
    tissues.tissues = results;
    return writeObjArray(tissues, '../../files/expression-tissues.js', 'tissues');
  })
  .then(() => {
    console.log('complete');
  })
  .catch((err) => {
    console.error(err);
  });
