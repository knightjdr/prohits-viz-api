import { URL } from 'url';

const urlDetails = req => {
  if (req.get('referer')) {
    const url = new URL(req.get('referer'));
    return {
      host: url.host,
    };
  }
  return {};
};

export default urlDetails;
