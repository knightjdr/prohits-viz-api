import insert from '../../helpers/database/insert.js';
import urlDetails from '../../utils/url-details.js';

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
  const fileSize = calculateFileSize(files?.file);

  return {
    date: new Date().toISOString(),
    file: fileSize > 0,
    fileSize,
    origin: urlDetails(req).host,
    path,
    tool: params && params.tool ? params.tool : '',
  };
};

const logTask = (req, res, next) => {
  const document = creatDocument(req);
  insert('tracking', document);
  next();
};

export default logTask;
