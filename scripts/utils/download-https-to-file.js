import fs from 'fs';
import https from 'https';

const downloadHttp = (url, dest, options = {}) => (
  new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(dest);
    https.get(url, options, (response) => {
      response.on('data', (chunk) => {
        stream.write(chunk);
      });
      response.on('end', () => {
        stream.end();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err);
    });
  })
);

export default downloadHttp;
