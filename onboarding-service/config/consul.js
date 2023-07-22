const consul = require('consul');
const dotenv = require("dotenv").config();
const logger = require("./winston");
const constants = require('./constants');

const consulClient = new consul({ host: constants.HOST_IP, port: constants.CONSUL_PORT, promisify: true });
const CONSUL_ID = require('uuid').v4();

console.log(constants)
consulClient.agent.service.register(constants.SERVICE_PREFIX).then(() => {
    logger.log({
        level: "info",
        message: `Onboarding Service registered with consul`,
    });
}).catch((err) => logger.log({
    level: "info",
    message: `Onboarding Service registration failed with consul${err}`,
}));

module.exports = consulClient;