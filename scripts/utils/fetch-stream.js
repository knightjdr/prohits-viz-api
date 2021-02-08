import fetch from 'node-fetch';
import fs from 'fs';

const stream = (res, file) => (
  new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(file);
    res.body.pipe(dest);
    res.body.on('end', () => {
      resolve();
    });
    dest.on('error', reject);
  })
);

const fetchStream = async (url, file) => {
  const res = await fetch(url);
  if (res.ok) {
    await stream(res, file);
  } else {
    throw new Error(res.statusText);
  }
};

export default fetchStream;
