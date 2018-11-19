const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // if field is empty, convert it to empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // validating title
  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  // validating company
  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  // validating location
  if (validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  // validating from
  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors: errors,
    // only valid if there are no errors
    isValid: isEmpty(errors)
  };
};
