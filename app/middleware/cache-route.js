const mcache = require('memory-cache');

const CACHE_TIME = 15; // Cache time in minutes;

const cache = (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}`;
  const cachedBody = mcache.get(key);
  const cachceMS = CACHE_TIME * 60000;
  res.setHeader('Cache-Control', `public, max-age=${cachceMS}`);
  res.setHeader('Expires', new Date(Date.now() + cachceMS).toUTCString());
  if (cachedBody) {
    res.send(cachedBody);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, cachceMS);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cache;
