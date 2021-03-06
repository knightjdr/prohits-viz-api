import fs from 'fs';
import Ftp from 'ftp';

const downloadFile = (host, file, dest) => (
  new Promise((resolve, reject) => {
    const outFile = fs.createWriteStream(dest);
    const client = new Ftp();
    client.on('ready', () => {
      client.get(file, (err, stream) => {
        if (err) {
          fs.unlink(dest);
          reject(err);
        }
        stream.once('close', () => {
          client.end();
          outFile.close();
          resolve();
        });
        stream.pipe(outFile);
      });
    });
    client.connect({ host });
  })
);

export default downloadFile;
