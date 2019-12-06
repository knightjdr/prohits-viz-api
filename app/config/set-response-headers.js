const setResponseHeaders = (req, res, next) => {
  res.setHeader('X-XSS-Protection', '1;mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
};

export default setResponseHeaders;
