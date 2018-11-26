const mcache = require('memory-cache');

const CACHE_TIME = 15; // Cache time in minutes;

const cache = (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}`;
  const cachedBody = mcache.get(key);
  const cacheMS = CACHE_TIME * 60000;
  res.setHeader('Expires', new Date(Date.now() + cacheMS).toUTCString());
  if (cachedBody) {
    res.send(cachedBody);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, cacheMS);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cache;
