import fetch from 'node-fetch';

const fetchJSON = async (url, headers = {}) => {
  const res = await fetch(url, { headers });
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
};

export default fetchJSON;
