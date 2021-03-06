import readJSON from '../../../app/utils/read-json.js';
import round from '../../utils/round.js';
import sortArray from '../../utils/sort-array-strings.js';

const mongoKeyRE = new RegExp(/[.]/g);

const formatCellName = (originalName) => {
  let cellName = originalName;
  cellName = originalName.replace(/ cell(?: line)*$/, '');
  return cellName.replace(mongoKeyRE, '_');
};

const parseTissues = async (infile) => {
  const expression = {};
  const tissues = {};

  const json = await readJSON(infile);
  json.d.results.forEach((sample) => {
    const { NORMALIZED_INTENSITY: intensity, TISSUE_NAME: tissue, UNIPROT_ACCESSION: id } = sample;
    const cell = formatCellName(tissue);
    tissues[cell] = true;

    if (!expression[id]) {
      expression[id] = {};
    }
    expression[id][cell] = round(Number(intensity), 2);
  });

  const tissueArr = Object.keys(tissues);
  sortArray(tissueArr);

  return { expression, tissues: tissueArr };
};

export default parseTissues;
