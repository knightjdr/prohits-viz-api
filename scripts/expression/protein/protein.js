import fs from 'fs/promises';

import download from './download-protein.js';
import parseTissues from './parse-tissues.js';
import writeExpression from '../write-expression.js';

const cellFile = './downloads/protein-cells.json';
const tissueFile = './downloads/protein-tissues.json';

const outFileExpression = '../../files/unmapped/protein-expression.json';
const outFileTissue = '../../files/protein-tissues.json';

const rna = async () => {
  await download();
  const cells = await parseTissues(cellFile);
  const tissues = await parseTissues(tissueFile);

  await writeExpression({ cells: cells.expression, tissues: tissues.expression }, outFileExpression);
  await fs.writeFile(outFileTissue, JSON.stringify({ cells: cells.tissues, tissues: tissues.tissues }, null, 2));
};

export default rna;
