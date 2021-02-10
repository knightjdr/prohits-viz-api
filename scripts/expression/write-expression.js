import removeDuplicates from '../../app/utils/remove-duplicates.js';
import writeFile from '../../app/helpers/files/write-file.js';

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

  await writeFile(outfile, JSON.stringify(mergedExpression));
};

export default writeExpression;
