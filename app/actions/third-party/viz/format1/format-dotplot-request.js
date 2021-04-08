import { workerData, parentPort } from 'worker_threads';

import removeDuplicates from '../../../../utils/remove-duplicates.js';

const { data, parameters } = workerData;

const defineWorstScoreSetter = (scoreType) => {
  if (scoreType === 'gte') {
    return [
      (value, min) => (
        value < min ? value : min
      ),
      Infinity,
    ];
  }
  return [
    (value, max) => (
      value > max ? value : max
    ),
    -Infinity,
  ];
};

const scoreVariables = defineWorstScoreSetter(parameters.scoreType);
const defineWorstScore = scoreVariables[0];
let worstScore = scoreVariables[1];

let conditions = [];
let readouts = [];
const measurements = {};

data.forEach((datum) => {
  const abundance = datum[parameters.abundance];
  const condition = datum[parameters.condition];
  const ratio = datum[parameters.ratio];
  const readout = datum[parameters.readout];
  const score = datum[parameters.score];
  conditions.push(condition);
  readouts.push(readout);
  if (!measurements[condition]) {
    measurements[condition] = {};
  }
  measurements[condition][readout] = {
    ratio,
    score,
    value: abundance,
  };
  worstScore = defineWorstScore(score, worstScore);
});

conditions = removeDuplicates(conditions);
readouts = removeDuplicates(readouts);

const rowDB = [];

readouts.forEach((readout) => {
  const row = {
    name: readout,
    data: [],
  };

  conditions.forEach((condition) => {
    const ratio = measurements[condition][readout] ? measurements[condition][readout].ratio : 0;
    const score = measurements[condition][readout] ? measurements[condition][readout].score : worstScore;
    const value = measurements[condition][readout] ? measurements[condition][readout].value : 0;
    row.data.push({ ratio, score, value });
  });

  rowDB.push(row);
});

parentPort.postMessage({
  columnDB: conditions,
  minimap: {
    main: {
      needSyncing: true,
    },
  },
  rowDB,
  settings: {
    imageType: 'dotplot',
  },
});
