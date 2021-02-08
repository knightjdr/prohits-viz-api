import download from './download-rna.js';
import parseTissues from './parse-tissues.js';
import writeFile from '../../../app/helpers/files/write-file.js';

const cellFile = './downloads/rna-cells.tsv';
const tissueFile = './downloads/rna-tissues.tsv';

const dataFile = '../../files/rna-expression.txt';
const jsonFile = '../../files/rna-tissues.json';

const rna = async () => {
  await download();
  const cells = await parseTissues(cellFile, dataFile, 'w');
  const tissues = await parseTissues(tissueFile, dataFile, 'a');
  await writeFile(jsonFile, JSON.stringify({ cells, tissues }, null, 2));
};

export default rna;
