/* eslint no-console: 0 */

const download = require('./download');
const parseBiogrid = require('./parse-biogird');
const parseIntact = require('./parse-intact');
const parseTaxonomy = require('./parse-taxonomy');
const sortArray = require('../helpers/sort-array-strings');
const writeArray = require('../helpers/write-array');

let species;
let taxon;

download()
  .then(() => parseTaxonomy())
  .then((results) => {
    taxon = results;
    return parseBiogrid(taxon, species);
  })
  .then((results) => {
    species = results;
    return parseIntact(taxon);
  })
  .then((results) => {
    species = {
      ...species,
      ...results,
    };
    const speciesArr = Object.keys(species);
    sortArray(speciesArr);
    return writeArray(speciesArr);
  })
  .then(() => {
    console.log('complete');
  })
  .catch((err) => {
    console.error(err);
  });
