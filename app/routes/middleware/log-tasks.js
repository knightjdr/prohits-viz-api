import insert from '../../helpers/database/insert.js';
import logger from '../../helpers/logging/logger.js';
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

const getOrigin = (req) => {
  const { path } = req;
  if (path.startsWith('/third-party')) {
    const apikey = req.get('apikey');
    if (!apikey) {
      return 'unknown';
    }
    const [contact] = apikey.split(':');
    return contact;
  }
  return urlDetails(req).host;
};

const creatDocument = (req) => {
  const {
    body,
    files,
    params,
    path,
  } = req;
  const fileSize = calculateFileSize(files?.file);

  return {
    date: new Date().toISOString(),
    file: fileSize > 0,
    fileSize,
    fileType: body?.fileType || '',
    origin: getOrigin(req),
    path,
    tool: params?.tool || '',
  };
};

const logTask = async (req, res, next) => {
  try {
    const document = creatDocument(req);
    await insert('tracking', document);
    next();
  } catch (error) {
    logger.error(`log task - ${error.toString()}`);
    next();
  }
};

export default logTask;
