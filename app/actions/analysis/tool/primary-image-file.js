const getPrimaryImageFile = (tool, settings) => {
  if (tool === 'condition-condition') {
    return `${settings.condition}-${settings.condition}`;
  } if (tool === 'correlation') {
    return `${settings.readout}-${settings.readout}`;
  } if (tool === 'dotplot') {
    return 'dotplot';
  } if (tool === 'scv') {
    return 'scv';
  } if (tool === 'specificity') {
    return 'specificity';
  }
  return '';
};

export default getPrimaryImageFile;
