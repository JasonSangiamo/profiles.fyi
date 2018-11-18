const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // if field is empty, convert it to empty string
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // validating username
  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Name must be between 3 and 20 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // validating full name
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  }

  // validating email
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // validating password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 4, max: 20 })) {
    errors.password = "Password must be between 4 and 20 characters";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  return {
    errors: errors,
    // only valid id there are no errors
    isValid: isEmpty(errors)
  };
};
