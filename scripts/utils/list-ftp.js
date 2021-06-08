import Ftp from 'ftp';

const listFTP = (host, dir) => (
  new Promise((resolve, reject) => {
    const client = new Ftp();
    client.on('ready', () => {
      client.list(dir, (err, list) => {
        if (err) {
          reject(err);
        }
        client.end();
        resolve(list);
      });
    });
    client.connect({ host });
  })
);

export default listFTP;
