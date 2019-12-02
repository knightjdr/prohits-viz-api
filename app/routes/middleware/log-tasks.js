const insert = require('../../helpers/database/insert');
const urlDetails = require('../../utils/url-details');

// Logs requests to database
const logTask = (req, res, next) => {
  const { params, path } = req;
  const insertObj = {
    date: new Date().toISOString(),
    file: false,
    fileSize: 0,
    origin: urlDetails(req).host,
    path,
    type: params && params.type ? params.type : '',
  };
  if (req.files) {
    insertObj.fileSize = req.files.reduce((accum, file) => {
      if (file.originalname === 'samplefile.txt') {
        return accum;
      }
      insertObj.file = true;
      return accum + file.size;
    }, 0);
  }
  insert('tracking', insertObj);
  next();
};

module.exports = logTask;
