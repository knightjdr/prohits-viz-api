import logger from '../../helpers/logging/logger.js';

const nocache = (req, res, next) => {
  try {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Expires', '-1');
    res.setHeader('Pragma', 'no-cache');
    next();
  } catch (error) {
    logger.error(`set no cache headers - ${error.toString()}`);
    next();
  }
};

export default nocache;
