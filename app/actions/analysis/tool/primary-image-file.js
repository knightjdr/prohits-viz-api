const getPrimaryImageFile = (tool, settings) => {
  switch (tool) {
    case 'correlation':
      return `${settings.readout}-${settings.readout}`;
    case 'dotplot':
      return 'dotplot';
    default:
      return '';
  }
};

export default getPrimaryImageFile;
