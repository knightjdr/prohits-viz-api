/* eslint no-console: 0 */

import createFolder from '../utils/create-folder.js';
import protein from './protein/protein.js';
import rna from './rna/rna.js';

const main = async () => {
  try {
    await createFolder('./downloads');
    await Promise.all([
      protein(),
      rna(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

main();
