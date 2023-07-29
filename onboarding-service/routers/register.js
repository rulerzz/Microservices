const registerRouter = require("express").Router();

const { query, validationResult } = require("express-validator");

const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5']

registerRouter.post(
  "/",
  [
    query("username")
      .notEmpty()
      .isLength(6),
    query("password")
      .notEmpty()
      .isStrongPassword({ 
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1,
        minNumbers: 1, 
        minSymbols: 1, 
        returnScore: false, 
        pointsPerUnique: 1, 
        pointsPerRepeat: 0, 
        pointsForContainingLower: 10, 
        pointsForContainingUpper: 10, 
        pointsForContainingNumber: 10, 
        pointsForContainingSymbol: 10 
      }),
    query("subjects")
      .notEmpty()
      .isIn(subjects),
    query("email")
      .notEmpty()
      .isEmail(),
    query("agree")
      .notEmpty()
      .isBoolean()
      .equals('true'),
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
