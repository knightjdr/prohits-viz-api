const constructJSON = data => ({
  annotations: data.annotations,
  columnDB: data.columnDB,
  columnOrder: data.columnOrder,
  imageType: data.imageType,
  markers: data.markers,
  rowDB: data.rowDB,
  rowOrder: data.rowOrder,
  settings: {
    abundanceCap: data.abundanceCap,
    abundanceType: data.abundanceType,
    edgeColor: data.edgeColor,
    fillColor: data.fillColor,
    minAbundance: data.minAbundance,
    primaryFilter: data.primaryFilter,
    scoreType: data.scoreType,
    secondaryFilter: data.secondaryFilter,
  },
});

export default constructJSON;
