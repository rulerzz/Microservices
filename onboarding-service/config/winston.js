const winston = require("winston");
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
  format: winston.format.json(),
  defaultMeta: { service: "onboarding-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console({
      level: constants.WINSTON_LEVEL,
      colorize: constants.WINSTON_COLORIZE,
      prettyPrint: constants.WINSTON_PRETTY_PRINT,
      timestamp: constants.WINSTON_TIMESTAMP,
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
    ),
  ],
  exitOnError: false,
});

module.exports = logger;
