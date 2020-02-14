import { spawn } from 'child_process';

const spawnProcess = (socket, options) => (
  new Promise((resolve, reject) => {
    const syncProcess = spawn(
      'pvexport',
      [
        '--file',
        'data.json',
        '--font',
        options.font,
        '--format',
        options.format,
        '--imageType',
        options.imageType,
      ],
      {
        cwd: options.workingDir,
      },
    );

    syncProcess.on('error', (err) => {
      reject(err);
    });
    syncProcess.on('exit', (err) => {
      if (!err) {
        socket.emit('action', { file: options.targetFile, type: 'DOWNLOAD_EXPORT_IMAGE' });
        resolve();
      }
      reject(err);
    });
  })
);

export default spawnProcess;
