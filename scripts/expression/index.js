/* eslint no-console: 0 */

const download = require('./download');
const parseTissues = require('./parse-tissues');
const sortArray = require('../helpers/sort-array-strings');
const writeArray = require('../helpers/write-array');

let tissues;

const cellFile = './downloads/cells.tsv';
const tissueFile = './downloads/tissues.tsv';
const outFile = '../../files/tissues.txt';

download()
  .then(() => parseTissues(cellFile, outFile, 'w'))
  .then((results) => {
    tissues = results;
    return parseTissues(tissueFile, outFile, 'a');
  })
  .then((results) => {
    tissues = {
      ...tissues,
      ...results,
    };
    const speciesArr = Object.keys(tissues);
    sortArray(speciesArr);
    return writeArray(speciesArr, '../../files/expression-tissues.js', 'tissues');
  })
  .then(() => {
    console.log('complete');
  })
  .catch((err) => {
    console.error(err);
  });
