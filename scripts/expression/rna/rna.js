import fs from 'fs/promises';

import download from './download-rna.js';
import parseTissues from './parse-tissues.js';
import writeExpression from '../write-expression.js';

const cellFile = './downloads/rna-cells.tsv';
const tissueFile = './downloads/rna-tissues.tsv';

const outFileExpression = '../../files/unmapped/rna-expression.json';
const outFileTissue = '../../files/rna-tissues.json';

const rna = async () => {
  await download();
  const cells = await parseTissues(cellFile);
  const tissues = await parseTissues(tissueFile);

  await writeExpression({ cells: cells.expression, tissues: tissues.expression }, outFileExpression);
  await fs.writeFile(outFileTissue, JSON.stringify({ cells: cells.tissues, tissues: tissues.tissues }, null, 2));
};

export default rna;
