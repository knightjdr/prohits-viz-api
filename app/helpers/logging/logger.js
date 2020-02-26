import winston from 'winston';

import config from '../../config/config.js';

// set env and log directory
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// configure timestamp
const tsOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
const tsFormat = () => (new Date()).toLocaleTimeString('en-CA', tsOptions);

const Logger = new (winston.createLogger)({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD, HH:mm:ss'}),
    winston.format.printf(info => {
      return `${info.timestamp} - ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: `${logDir}/${config.logPrefix}error.log`,
      level: 'error',
      name: 'error-file',
    }),
    new winston.transports.File({
      filename: `${logDir}/${config.logPrefix}combined.log`,
      name: 'log-file',
    }),
  ],
});

// In development environment don't log to files, just console.
if (env === 'development') {
  Logger.remove('error-file');
  Logger.remove('log-file');
  Logger.add(winston.transports.Console, {
    colorize: true,
    timestamp: tsFormat,
  });
}

export default Logger;
