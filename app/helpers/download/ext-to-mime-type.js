import path from 'path';

const extToMimeType = (fileName) => {
  const ext = path.extname(fileName).substr(1);
  switch (ext) {
    case 'json':
      return 'application/json';
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
};

export default extToMimeType;
