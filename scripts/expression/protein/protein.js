import download from './download-protein.js';
import parseTissues from './parse-tissues.js';
import writeFile from '../../../app/helpers/files/write-file.js';

const cellFile = './downloads/protein-cells.json';
const tissueFile = './downloads/protein-tissues.json';

const dataFile = '../../files/protein-expression.txt';
const jsonFile = '../../files/protein-tissues.json';

const rna = async () => {
  await download();
  const cells = await parseTissues(cellFile, dataFile, 'w');
  const tissues = await parseTissues(tissueFile, dataFile, 'a');
  await writeFile(jsonFile, JSON.stringify({ cells, tissues }, null, 2));
};

export default rna;
