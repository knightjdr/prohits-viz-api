import mcache from 'memory-cache';

import config from '../../config/config.js';
import logger from '../../helpers/logging/logger.js';

const defineCacheKey = req => (
  `__express__${req.originalUrl || req.url}`
);

const createCacheContent = (req) => {
  const key = defineCacheKey(req);
  return {
    key,
    value: mcache.get(key),
  };
};

const sendOrGenerateContent = (res, next, cachedContent) => {
  const { key, value } = cachedContent;
  if (value) {
    res.send(value);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, config.routeCacheTime);
      res.sendResponse(body);
    };
    next();
  }
};

const cache = (req, res, next) => {
  try {
    const cachedContent = createCacheContent(req);
    res.setHeader('Expires', new Date(Date.now() + config.routeCacheTime).toUTCString());
    sendOrGenerateContent(res, next, cachedContent);
  } catch (error) {
    logger.error(`cache route - ${error.toString()}`);
    next();
  }
};

export default cache;
