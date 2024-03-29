import archiver from 'archiver';

const archive = (folder, res) => (
  new Promise((resolve, reject) => {
    res.attachment('task.zip');
    res.setHeader('Content-Type', 'application/zip');
    const zip = archiver('zip', {
      zlib: { level: 9 },
    });
    zip.on('finish', () => { res.end(); });
    zip.on('error', () => { reject(new Error('could not zip folder')); });
    zip.on('warning', () => { reject(new Error('could not zip folder')); });
    zip.pipe(res);
    zip.directory(folder, false);
    zip.finalize();
  })
);

export default archive;
