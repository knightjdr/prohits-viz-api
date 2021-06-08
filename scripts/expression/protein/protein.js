import fs from 'fs/promises';

import download from './download-protein.js';
import getDate from '../../utils/get-date.js';
import parseTissues from './parse-tissues.js';
import writeExpression from '../write-expression.js';

const OUTFILE_EXPRESSION = './files/unmapped/protein-expression.json';
const OUTFILE_TISSUE = './files/protein-tissues.json';

const rna = async (downloadFolder) => {
  await download(downloadFolder);
  const cells = await parseTissues(`${downloadFolder}protein-cells.json`);
  const tissues = await parseTissues(`${downloadFolder}protein-tissues.json`);

  await writeExpression({ cells: cells.expression, tissues: tissues.expression }, OUTFILE_EXPRESSION);
  await fs.writeFile(OUTFILE_TISSUE, JSON.stringify({ cells: cells.tissues, tissues: tissues.tissues }, null, 2));
  return getDate();
};

export default rna;
