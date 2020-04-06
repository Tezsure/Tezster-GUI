/**
 * Logger helper
 */
import fs from 'fs';
import path from 'path';

require('dotenv').config();

const { createLogger, format, transports } = require('winston');

const { combine, errors, json } = format;

const logFile = process.env.LOG_FILE || 'app';

// logs middleware
const logDirectory = path.join(__dirname, '../../storage/logs');

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
const rfs = require('rotating-file-stream');

rfs.createStream('file.log', {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  path: logDirectory,
  compress: 'gzip' // compress rotated files
});

const logTransports = [
  new transports.File({ filename: path.join(`${logDirectory}/${logFile}.log`) })
];

logTransports.push(
  new transports.Console({
    format: format.simple()
  })
);

const Logger = createLogger({
  format: combine(
    format.timestamp(),
    format.splat(),
    errors({ stack: true }),
    json()
  ),
  transports: logTransports
});

module.exports = Logger;
