import fs from 'fs';

import readJSON from '../../utils/read-json.js';
import sortArray from '../../utils/sort-array-strings.js';

const mongoKeyRE = new RegExp(/[.]/g);

const formatCellName = (originalName) => {
  let cellName = originalName;
  cellName = originalName.replace(/ cell(?: line)*$/, '');
  return cellName.replace(mongoKeyRE, '_');
};

const parseTissues = (infile, outfile, flags) => (
  new Promise((resolve) => {
    const tissues = {};
    const stream = fs.createWriteStream(outfile, { flags });

    readJSON(infile)
      .then((json) => {
        json.d.results.forEach((sample) => {
          const { NORMALIZED_INTENSITY, TISSUE_NAME, UNIPROT_ACCESSION } = sample;
          const cell = formatCellName(TISSUE_NAME);
          tissues[cell] = true;
          stream.write(`${UNIPROT_ACCESSION}\t${cell}\t${NORMALIZED_INTENSITY}\n`);
        });

        stream.end();
        stream.on('finish', () => {
          const tissueArr = Object.keys(tissues);
          sortArray(tissueArr);
          resolve(tissueArr);
        });
      });
  })
);

export default parseTissues;
