// Parses text response from gProfiler.
const parseText = (text = '') => (
  new Promise((resolve, reject) => {
    try {
      const textArr = text.split('\n');

      // Order is used for storing the default order for the search results.
      let order = 0;

      const parsed = textArr.reduce((accum, line) => {
        if (RegExp('^[0-9]').test(line)) {
          const lineArr = line.split('\t');
          const source = lineArr[9];
          accum.terms.push({
            depth: parseInt(lineArr[12], 10),
            genes: lineArr[13].replace(/,/g, ', '),
            order,
            q: parseInt(lineArr[4], 10),
            qt: parseInt(lineArr[5], 10),
            pValue: Number(lineArr[2]).toExponential(2),
            source,
            t: parseInt(lineArr[3], 10),
            term: lineArr[11].trim(),
            termID: lineArr[8],
          });
          order += 1;
        } else if (RegExp('#WARNING').test(line)) {
          accum.warnings.push(line.substring(10));
        }
        return accum;
      }, {
        terms: [],
        warnings: [],
      });
      // Provide a boolean if there are no results.
      parsed.noResults = order === 0;

      resolve(parsed);
    } catch (error) {
      reject(error);
    }
  })
);

module.exports = parseText;
