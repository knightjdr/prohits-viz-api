import fs from 'fs';
import readline from 'readline';

const parseDomains = file => (
  new Promise((resolve, reject) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });

    const domains = {};
    let lineNumber = 0;
    lineReader.on('line', (line) => {
      lineNumber += 1;
      if (lineNumber >= 4) {
        const [accession, , , start, end, , domain] = line.split('\t');
        if (!domains[accession]) {
          domains[accession] = [];
        }
        domains[accession].push({
          name: domain,
          start: Number(start),
          end: Number(end),
        });
      }
    });
    lineReader.on('close', () => {
      resolve(domains);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

export default parseDomains;
