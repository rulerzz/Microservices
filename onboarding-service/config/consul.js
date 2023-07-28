const consul = require('consul');
const dotenv = require("dotenv").config();
const logger = require("./winston");
const constants = require('./constants');

const consulClient = new consul({ host: constants.HOST_IP, port: constants.CONSUL_PORT, promisify: true });
const CONSUL_ID = require('uuid').v4();

consulClient.agent.service.register({
    name: constants.SERVICE_PREFIX,
    id: CONSUL_ID,
    tags: [constants.SERVICE_PREFIX, constants.HEALTHURL],
    address: constants.HOST_IP,
    port: parseInt(constants.SERVICE_PORT),
    check: {
        http: `http://${constants.HOST_IP}:${constants.SERVICE_PORT}${constants.HEALTHURL}`,
        interval: "10s",
        timeout: "5s"
    }
}).then(() => {
    logger.log({
        level: "info",
        message: `Onboarding Service registered with consul`,
    });
}).catch((err) => logger.log({
    level: "info",
    message: `Onboarding Service registration failed with consul${err}`,
}));

module.exports = consulClient;