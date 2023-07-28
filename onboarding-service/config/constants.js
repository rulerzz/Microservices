var path = require('path');
const dotenv = require("dotenv").config();

module.exports = {
    WINSTON_FILE_NAME: "combined.log",
    WINSTON_ERROR_FILE_NAME: "error.log",
    WINSTON_DIR_NAME: path.join(__dirname, '../logs/'),
    SERVICE_VERSION: process.env.SERVICE_VERSION ? process.env.SERVICE_VERSION : "v1",
    SERVICE_PREFIX: process.env.SERVICE_PREFIX ? process.env.SERVICE_PREFIX : "onboarding-service",
    HEALTHURL: `/${process.env.SERVICE_VERSION}/${process.env.SERVICE_PREFIX}/health`,
    HOST_IP: process.env.HOST_IP ? process.env.HOST_IP : "localhost",
    CONSUL_PORT: process.env.CONSUL_PORT ? process.env.CONSUL_PORT : 8500,
    SERVICE_PORT: process.env.PORT ? process.env.PORT: 5001
};
