const path = require('path');

const extToMimeType = (fileName) => {
  const ext = path.extname(fileName).substr(1);
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
};

module.exports = extToMimeType;
