import fs from 'fs';
import readline from 'readline';

const splitField = value => value.split('; ').filter(Boolean);

const parseUniprot = file => (
  new Promise((resolve, reject) => {
    const geneData = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const uniprotacc = splitField(fields[0]);
        const uniprotid = splitField(fields[1]);
        const entrez = splitField(fields[2]);
        const refseqp = splitField(fields[3]);
        const ensemblg = splitField(fields[18]);
        const ensemblp = splitField(fields[20]);

        entrez.forEach((id) => {
          if (!geneData[id]) {
            geneData[id] = {
              ensemblg: [],
              ensemblp: [],
              refseqp: [],
              uniprotacc: [],
              uniprotid: [],
            };
          }
          geneData[id].ensemblg.push(...ensemblg);
          geneData[id].refseqp.push(...refseqp);
          geneData[id].ensemblp.push(...ensemblp);
          geneData[id].uniprotacc.push(...uniprotacc);
          geneData[id].uniprotid.push(...uniprotid);
        });
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      resolve(geneData);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

export default parseUniprot;
