import fs from 'fs/promises';

import removeDuplicates from '../../app/utils/remove-duplicates.js';

const writeExpression = async (expression, outfile) => {
  const ids = removeDuplicates([
    ...Object.keys(expression.cells),
    ...Object.keys(expression.tissues),
  ]);

  const mergedExpression = {};
  ids.forEach((id) => {
    mergedExpression[id] = {
      ...expression.cells[id],
      ...expression.tissues[id],
    };
  });

  await fs.writeFile(outfile, JSON.stringify(mergedExpression));
};

export default writeExpression;
