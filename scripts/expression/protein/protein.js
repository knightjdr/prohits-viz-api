import download from './download-protein.js';
import parseTissues from './parse-tissues.js';
import writeExpression from '../write-expression.js';
import writeFile from '../../../app/helpers/files/write-file.js';

const cellFile = './downloads/protein-cells.json';
const tissueFile = './downloads/protein-tissues.json';

const outFileExpression = '../../files/protein-expression.json';
const outFileTissue = '../../files/protein-tissues.json';

const rna = async () => {
  await download();
  const cells = await parseTissues(cellFile);
  const tissues = await parseTissues(tissueFile);

  await writeExpression({ cells: cells.expression, tissues: tissues.expression }, outFileExpression);
  await writeFile(outFileTissue, JSON.stringify({ cells: cells.tissues, tissues: tissues.tissues }, null, 2));
};

export default rna;
