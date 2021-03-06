import Ftp from 'ftp';

const downloadFile = (host, file) => (
  new Promise((resolve, reject) => {
    const client = new Ftp();
    client.on('ready', () => {
      const chunks = [];
      client.get(file, (err, stream) => {
        if (err) {
          reject(err);
        }
        stream.once('close', () => {
          client.end();
          resolve(Buffer.concat(chunks).toString('utf8'));
        });
        stream.on('data', (chunk) => { chunks.push(Buffer.from(chunk)); });
      });
    });
    client.connect({ host });
  })
);

export default downloadFile;
