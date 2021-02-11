import fs from 'fs/promises';

import removeDuplicates from '../../app/utils/remove-duplicates.js';
import sortArray from '../utils/sort-array-strings.js';

const writeInteractions = async (interactions, outfile) => {
  const mergedInteractions = {};
  Object.entries(interactions.biogrid).forEach(([source, targets]) => {
    mergedInteractions[source] = Object.keys(targets);
  });

  Object.entries(interactions.intact).forEach(([source, targets]) => {
    if (!mergedInteractions[source]) {
      mergedInteractions[source] = Object.keys(targets);
    } else {
      mergedInteractions[source] = [
        ...mergedInteractions[source],
        ...Object.keys(targets),
      ];
    }
    mergedInteractions[source] = removeDuplicates(mergedInteractions[source]);
    sortArray(mergedInteractions[source]);
  });

  await fs.writeFile(outfile, JSON.stringify(mergedInteractions));
};

export default writeInteractions;
