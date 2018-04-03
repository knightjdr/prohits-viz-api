const winston = require('winston');

const Config = require('./config');

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

// configure logger
// the filename prefix is so that in the test env I can write to unique files
const Logger = new (winston.Logger)({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      filename: `${logDir}/${Config.logPrefix}error.log`,
      json: false,
      level: 'error',
      name: 'error-file',
      timestamp: tsFormat,
    }),
    new winston.transports.File({
      filename: `${logDir}/${Config.logPrefix}combined.log`,
      json: false,
      name: 'log-file',
      timestamp: tsFormat,
    }),
  ],
});

// in development environment don't log to files, just console
if (env === 'development') {
  Logger.remove('error-file');
  Logger.remove('log-file');
  Logger.add(winston.transports.Console, {
    colorize: true,
    timestamp: tsFormat,
  });
}

module.exports = Logger;
