const winston = require("winston");
const { format, createLogger, transports } = winston;
const { timestamp, combine, errors, json } = format;

const constants = require("./constants");
require("winston-daily-rotate-file");

const onboardObjectRotate = (filename, level, name) => {
  return new winston.transports.DailyRotateFile({
    filename: filename,
    dirname: constants.WINSTON_DIR_NAME,
    datePattern: "YYYY-MM-DD-HH",
    level: level,
    name: name,
    handleExceptions: true,
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  });
};

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: "onboarding-service" },
  transports: [
    new winston.transports.Console({
      level: "info",
      colorize: true,
      prettyPrint: true,
      timestamp: true
    }),
    onboardObjectRotate(constants.WINSTON_FILE_NAME, "info", "combined-log"),
    onboardObjectRotate(
      constants.WINSTON_ERROR_FILE_NAME,
      "error",
      "error-log"
    ),
  ],
  exceptionHandlers: [
    onboardObjectRotate(
      constants.WINSTON_ERROR_FILE_NAME,
      "error",
      "exception"
    )
  ],
  exitOnError: false,
  handleExceptions: true
});

module.exports = logger;
