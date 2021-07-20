import fs from 'fs';
import readline from 'readline';

const getFirstLine = file => (
  new Promise((resolve, reject) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });
    lineReader.on('line', (line) => {
      lineReader.close();
      resolve(line);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

const getVersion = async (file) => {
  const firstLine = await getFirstLine(file);
  const version = firstLine.match(/version (\d+\.\d)/);
  return version[1];
};

export default getVersion;
