import url from 'url';

const urlDetails = req => (
  req.get('referer') ? url.parse(req.get('referer')) : {}
);

export default urlDetails;

