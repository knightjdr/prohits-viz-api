/* eslint no-console: 0 */

const download = require('./download');
const parseBiogrid = require('./parse-biogrid');
const parseIntact = require('./parse-intact');
const parseTaxonomy = require('./parse-taxonomy');
const sortArray = require('../helpers/sort-array-strings');
const writeArray = require('../helpers/write-array');

let species;
let taxon;

const biogridFile = './downloads/biogrid.tab';
const intactFile = './downloads/intact.tab';
const outFile = '../../files/interactors.txt';

download()
  .then(() => parseTaxonomy())
  .then((results) => {
    taxon = results;
    return parseBiogrid(taxon, biogridFile, outFile);
  })
  .then((results) => {
    species = results;
    return parseIntact(taxon, intactFile, outFile);
  })
  .then((results) => {
    species = {
      ...species,
      ...results,
    };
    const speciesArr = Object.keys(species);
    sortArray(speciesArr);
    return writeArray(speciesArr, '../../files/interactor-species.js', 'species');
  })
  .then(() => {
    console.log('complete');
  })
  .catch((err) => {
    console.error(err);
  });
