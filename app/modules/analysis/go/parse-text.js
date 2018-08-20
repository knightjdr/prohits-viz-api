// Parses text response from gProfiler.
const ParseText = (text) => {
  const textArr = text.split('\n');

  // Order is used for storing the default order for the search results.
  let order = 0;

  const parsed = textArr.reduce((accum, line) => {
    if (line && !RegExp('^#').test(line)) {
      const lineArr = line.split('\t');
      const source = lineArr[9];
      accum.source[source].push({
        depth: parseInt(lineArr[12], 10),
        genes: lineArr[13].split(','),
        order,
        q: parseInt(lineArr[4], 10),
        qt: parseInt(lineArr[5], 10),
        pValue: Number(lineArr[2]).toExponential(2),
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
    source: {
      BP: [],
      CC: [],
      cor: [],
      hp: [],
      keg: [],
      MF: [],
      rea: [],
      tf: [],
    },
    warnings: [],
  });
  // Provide a boolean if there are no results.
  parsed.noResults = order === 0;

  return parsed;
};

module.exports = ParseText;
