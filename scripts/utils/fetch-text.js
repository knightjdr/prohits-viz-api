import fetch from 'node-fetch';

const fetchText = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return res.text();
  }
  throw new Error(res.statusText);
};

export default fetchText;
