import fs from 'fs/promises';

import sortArray from '../utils/sort-array-strings.js';
import removeDuplicates from '../../app/utils/remove-duplicates.js';

const parseArrFromUniprot = (accessions, uniprot, field) => {
  const ids = [];

  accessions.forEach((accession) => {
    if (uniprot[accession]?.[field]) {
      ids.push(...uniprot[accession][field]);
    }
  });

  const withoutVersion = ids.map(value => value.split('.')[0]);
  const deduped = removeDuplicates(withoutVersion);
  sortArray(deduped);

  return deduped;
};

const parseStringFromUniprot = (accessions, uniprot, field) => {
  const ids = [];

  accessions.forEach((accession) => {
    if (uniprot[accession]?.[field]) {
      ids.push(uniprot[accession][field]);
    }
  });

  const withoutVersion = ids.map(value => value.split('.')[0]);
  const deduped = removeDuplicates(withoutVersion);
  sortArray(deduped);

  return deduped;
};

const parseRefseqG = (values) => {
  if (Array.isArray(values)) {
    const filtered = values.filter(value => value.startsWith('NM'));
    const withoutVersion = filtered.map(value => value.split('.')[0]);
    const deduped = removeDuplicates(withoutVersion);
    sortArray(deduped);
    return deduped;
  }

  return [];
};

const sortField = (arr) => {
  sortArray(arr);
  return arr;
};

const writeData = async (data, outfile) => {
  const { hgnc, uniprot } = data;

  const merged = {};
  Object.keys(hgnc).forEach((id) => {
    merged[id] = {
      aliasSymbol: sortField(hgnc[id].aliasSymbol),
      ensemblg: hgnc[id].ensemblg,
      ensemblp: parseArrFromUniprot(hgnc[id].uniprotacc, uniprot, 'ensemblp'),
      entrez: hgnc[id].entrez,
      prevSymbol: sortField(hgnc[id].prevSymbol),
      refseqg: parseRefseqG(hgnc[id].refseqg),
      refseqp: parseArrFromUniprot(hgnc[id].uniprotacc, uniprot, 'refseqp'),
      symbol: hgnc[id].symbol,
      uniprotacc: sortField(hgnc[id].uniprotacc),
      uniprotid: parseStringFromUniprot(hgnc[id].uniprotacc, uniprot, 'uniprotid'),
    };
  });

  await fs.writeFile(outfile, JSON.stringify(merged, null, 2));
};

export default writeData;
