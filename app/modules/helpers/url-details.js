const url = require('url');

const urlDetails = req => (
  req.get('referer') ? url.parse(req.get('referer')) : {}
);

module.exports = urlDetails;

