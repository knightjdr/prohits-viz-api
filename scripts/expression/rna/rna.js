import download from './download-rna.js';
import parseTissues from './parse-tissues.js';
import writeExpression from '../write-expression.js';
import writeFile from '../../../app/helpers/files/write-file.js';

const cellFile = './downloads/rna-cells.tsv';
const tissueFile = './downloads/rna-tissues.tsv';

const outFileExpression = '../../files/rna-expression.json';
const outFileTissue = '../../files/rna-tissues.json';

const rna = async () => {
  await download();
  const cells = await parseTissues(cellFile);
  const tissues = await parseTissues(tissueFile);

  await writeExpression({ cells: cells.expression, tissues: tissues.expression }, outFileExpression);
  await writeFile(outFileTissue, JSON.stringify({ cells: cells.tissues, tissues: tissues.tissues }, null, 2));
};

export default rna;
