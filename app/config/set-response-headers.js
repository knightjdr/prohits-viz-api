import logger from '../helpers/logging/logger.js';

const setResponseHeaders = (req, res, next) => {
  try {
    res.setHeader('X-XSS-Protection', '1;mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  } catch (error) {
    logger.error(`response headers - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default setResponseHeaders;
