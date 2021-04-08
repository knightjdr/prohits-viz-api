import { Worker } from 'worker_threads';

export const validateColumnDB = (columnDB) => {
  if (
    !columnDB
    || !Array.isArray(columnDB)
  ) {
    throw new Error('The file must include a "columnDB" array');
  }
};

export const validateRowDB = (rowDB) => {
  if (
    !rowDB
    || !Array.isArray(rowDB)
  ) {
    throw new Error('The file must include a "rowDB" array');
  }

  if (
    rowDB.length === 0
    || !rowDB[0].data
    || !rowDB[0].name
  ) {
    throw new Error('Each "rowDB" entry should have a "data" and "name" property');
  }

  if (
    !Array.isArray(rowDB[0].data)
    || rowDB[0].data[0].value === undefined
  ) {
    throw new Error('The row data should be an array with at least a "value" property');
  }
};

export const formatSimpleRequest = workerData => (
  new Promise((resolve, reject) => {
    const worker = new Worker('./app/actions/third-party/viz/format-heatmap-request.js', { workerData });
    worker.once('message', (message) => {
      resolve(message);
    });
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  })
);

const validateHeatmapFields = async (request) => {
  const { dataFormat } = request;

  let formatted = request;
  if (dataFormat === 'format1') {
    formatted = await formatSimpleRequest(request);
  }

  const { columnDB, rowDB } = formatted;

  validateColumnDB(columnDB);
  validateRowDB(rowDB);

  return formatted;
};

export default validateHeatmapFields;
