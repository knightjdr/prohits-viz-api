import fetchStream from '../../utils/fetch-stream.js';

// eslint-disable-next-line max-len
const createURL = tissueCategory => `https://www.proteomicsdb.org/proteomicsdb/logic/api/proteinexpressionacrosstissues.xsodata/InputParams(QUANTIFICATION_METHOD='MS1',TISSUE_ID_SELECTION='',TISSUE_CATEGORY_SELECTION='${tissueCategory}',SCOPE_SELECTION=1,AGGREGATE=1,SEPARATOR=',',CALCULATION_METHOD='iBAQ',ONLY_SP=1,NO_ISOFORM=1,TISSUE_ORDER=0,PROTEIN_ORDER=0,TAXCODE=9606,OMICS='Proteomics')/Results?$select=UNIPROT_ACCESSION,EXPRESSION_LEVEL,TISSUE_NAME,NORMALIZED_INTENSITY&$format=json`;

/* Download and unzip expression data from HPA. */
const downloadRNAExpression = async () => {
  await Promise.all([
    fetchStream(
      createURL('cell+line'),
      './downloads/protein-cells.json',
    ),
    fetchStream(
      createURL('tissue'),
      './downloads/protein-tissues.json',
    ),
  ]);
};

export default downloadRNAExpression;
