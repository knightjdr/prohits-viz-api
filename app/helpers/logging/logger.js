import winston from 'winston';

import config from '../../config/config.js';
import getTimestamp from '../../utils/get-timestamp.js';

// set env and log directory
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

const tsFormat = () => getTimestamp();

// eslint-disable-next-line new-cap
const Logger = new (winston.createLogger)({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD, HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.File({
      filename: `${logDir}/${config.logPrefix}error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `${logDir}/${config.logPrefix}combined.log`,
    }),
  ],
});

// In development environment don't log to files, just console.
if (env === 'development') {
  Logger.add(new winston.transports.Console(), {
    colorize: true,
    timestamp: tsFormat,
  });
}

export default Logger;
