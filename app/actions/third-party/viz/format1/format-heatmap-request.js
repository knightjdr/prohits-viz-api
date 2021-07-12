import { workerData, parentPort } from 'worker_threads';

import removeDuplicates from '../../../../utils/remove-duplicates.js';

const { data, dataKeys, parameters } = workerData;
const options = {
  ...parameters,
  ...dataKeys,
};

let conditions = [];
let readouts = [];
const measurements = {};

data.forEach((datum) => {
  const abundance = datum[options.abundance];
  const condition = datum[options.condition];
  const readout = datum[options.readout];
  conditions.push(condition);
  readouts.push(readout);
  if (!measurements[condition]) {
    measurements[condition] = {};
  }
  measurements[condition][readout] = abundance;
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
    const value = measurements[condition][readout] ?? 0;
    row.data.push({ value });
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
});
