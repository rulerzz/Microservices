const registerRouter = require("express").Router();

const { query, validationResult } = require("express-validator");

registerRouter.post(
  "/",
  [
    query("username").notEmpty(),
    query("password").notEmpty(),
    query("subjects").notEmpty(),
    query("email").notEmpty().isEmail(),
    query("agree").notEmpty(),
  ],
  function (request, response) {
    const result = validationResult(request);
    if (result.isEmpty()) {
      response.status(200).jsonp({ message: "ok" });
    }

    response.send({ errors: result.array() });
  }
);
module.exports = registerRouter;
