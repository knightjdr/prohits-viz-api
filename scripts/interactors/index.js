/* eslint no-console: 0 */

import download from './download.js';
import parseBiogrid from './parse-biogrid.js';
import parseIntact from './parse-intact.js';
import writeInteractions from './write-interactions.js';

const biogridFile = './downloads/biogrid.tab';
const intactFile = './downloads/intact.tab';
const outFile = '../../files/interactions.json';

const main = async () => {
  await download();
  const biogrid = await parseBiogrid(biogridFile);
  const intact = await parseIntact(intactFile);
  await writeInteractions({ biogrid, intact }, outFile);
};

main();
