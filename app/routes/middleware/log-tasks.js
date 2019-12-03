const insert = require('../../helpers/database/insert');
const urlDetails = require('../../utils/url-details');

const calculateFileSize = (files) => {
  let fileSize = 0;

  if (files) {
    fileSize = files.reduce((accum, file) => {
      if (file.originalname === 'samplefile.txt') {
        return accum;
      }
      return accum + file.size;
    }, 0);
  }

  return fileSize;
};

const creatDocument = (req) => {
  const { files, params, path } = req;
  const fileSize = calculateFileSize(files);

  return {
    date: new Date().toISOString(),
    file: fileSize > 0,
    fileSize,
    origin: urlDetails(req).host,
    path,
    type: params && params.type ? params.type : '',
  };
};

const logTask = (req, res, next) => {
  const document = creatDocument(req);
  insert('tracking', document);
  next();
};

module.exports = logTask;
