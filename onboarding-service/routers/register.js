const registerRouter = require("express").Router();

const { query, check, validationResult } = require("express-validator");
const User = require('../models/user');

const subjects = ['Arts & Humanities', 'Business', 'Computer Science & IT', 'Data Science', 'Health & Medicine', 'Language Learning', 'Life Sciences', 'Mathematics', 'Physical Science', 'Social Sciences'];

/*
Objective:
The objective of this code snippet is to handle the registration of a new user by validating the input data and checking if the email is already registered in the database. If the input data is valid and the email is not already registered, the user is created and a success response is sent.

Inputs:
- Express.js Router
- Express-validator library
- User model
- Array of subjects

Flow:
1. Define the route and HTTP method for user registration.
2. Validate the input data using the express-validator library.
3. Check if the email is already registered in the database using the User model.
4. If the email is not registered, create the user using the User model.
5. Send a success or failure response based on the validation and registration results.

Outputs:
- Success response with status code 200 and JSON object containing "status" key with value "success".
- Failure response with status code 400 and JSON object containing "status" key with value "failed" and "errors" key with an array of objects containing "field" and "message" keys for each validation error.

Additional aspects:
- The validation checks include username length, password strength, subject selection, email format, and agreement checkbox.
- The validation errors are mapped to a custom format for the response.
- The code uses async/await for handling asynchronous operations.
*/
registerRouter.post(
  "/",
  [
    check('username').not().isEmpty().isLength({ min: 5 }).withMessage('Name must have more than 5 characters'),
    check("password")
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }).withMessage('Your password must have 1 number, 1 symbol, 1 lowercase and 1 uppercase character and must have minimul 8 digits'),
    check("subjects")
      .notEmpty()
      .isIn(subjects).withMessage('Subjects must have atleast 1 selection'),
    check("email")
      .notEmpty()
      .isEmail().withMessage('Please enter a valid email'),
    check("agree")
      .notEmpty()
      .isBoolean()
      .equals('true').withMessage('Please check agreement'),
  ],
  async function (request, response) {
    const result = validationResult(request);
    if (result.isEmpty()) {
      const users = await User.find({ email: request.body.email });
      if (users.length > 0) {
        response.status(400).jsonp({ status: "failed", errors: [{ field: "email", message: "This email is already registered" }] });
      } else {
        const users = await User.create(request.body);
        response.status(200).jsonp({ status: "success" });
      }
    }
    else
      response.status(400).jsonp({ status: "failed", errors: result.array().map((element) => { return { field: element.path, message: element.msg } }) });
  }
);
module.exports = registerRouter;
