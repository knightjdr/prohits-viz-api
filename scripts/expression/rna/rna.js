import fs from 'fs/promises';

import download from './download-rna.js';
import getVersion from './get-version.js';
import parseTissues from './parse-tissues.js';
import writeExpression from '../write-expression.js';

const OUTFILE_EXPRESSION = './files/unmapped/rna-expression.json';
const OUTFILE_TISSUE = './files/rna-tissues.json';

const rna = async (downloadFolder) => {
  await download(downloadFolder);
  const cells = await parseTissues(`${downloadFolder}rna-cells.tsv`);
  const tissues = await parseTissues(`${downloadFolder}rna-tissues.tsv`);

  await writeExpression({ cells: cells.expression, tissues: tissues.expression }, OUTFILE_EXPRESSION);
  await fs.writeFile(OUTFILE_TISSUE, JSON.stringify({ cells: cells.tissues, tissues: tissues.tissues }, null, 2));
  return getVersion('https://www.proteinatlas.org/about/download');
};

export default rna;
