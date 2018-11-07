// https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const logDir = 'server/logs';

// Create Log Directory
if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
}
// Setup daily Rotate Log File
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-log.txt`,
  datePattern: 'YYYY-MM-DD',
  level: 'silly'
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    }),
    dailyRotateFileTransport
  ]
})

module.exports = logger;
