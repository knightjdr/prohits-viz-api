const constructJSON = data => ({
  columnDB: data.columnDB,
  columnOrder: data.columnOrder,
  imageType: data.imageType,
  rowDB: data.rowDB,
  rowOrder: data.rowOrder,
  settings: {
    abundanceCap: data.abundanceCap,
    edgeColor: data.edgeColor,
    fillColor: data.fillColor,
    minAbundance: data.minAbundance,
    primaryFilter: data.fillColor,
    scoreType: data.fillColor,
    secondaryFilter: data.secondaryFilter,
  },
});

export default constructJSON;
