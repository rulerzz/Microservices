const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const logger = require("./config/winston");
const bodyParser = require("body-parser");

const databaseURI = process.env.MONGO_URL.replace(
  "<password>",
  process.env.MONGO_SECRET
);

app.use(bodyParser.json());

const registerRouter = require("./routers/register");

app.use("/register", registerRouter);

app.listen(process.env.PORT, () => {
  mongoose.connect(databaseURI).then(() =>
    logger.log({
      level: "info",
      message:
        "Connected to MongoDB Database @onboardingdb.tcuq3h0.mongodb.net!",
    })
  );
  logger.log({
    level: "info",
    message: `Onboarding Service listening on port ${process.env.PORT}`,
  });
});
