import readJSON from '../utils/read-json.js';

const getFieldAsArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
};

const parseHGNC = async (file) => {
  const geneData = {};

  const data = await readJSON(file);
  data.response.docs.forEach((doc) => {
    const {
      alias_symbol: aliasSymbol,
      ensembl_gene_id: ensemblg,
      entrez_id: entrez,
      prev_symbol: prevSymbol,
      refseq_accession: refseqg,
      symbol,
      uniprot_ids: uniprotacc,
    } = doc;

    if (!geneData[entrez]) {
      geneData[entrez] = {
        ensemblg: [],
        refseqg: [],
        symbol: [],
        uniprotacc: [],
      };
    }

    geneData[entrez].ensemblg.push(...getFieldAsArray(ensemblg));
    geneData[entrez].refseqg.push(...getFieldAsArray(refseqg));
    geneData[entrez].symbol.push(
      symbol,
      ...getFieldAsArray(aliasSymbol),
      ...getFieldAsArray(prevSymbol),
    );
    geneData[entrez].uniprotacc.push(...getFieldAsArray(uniprotacc));
  });

  return geneData;
};

export default parseHGNC;
