const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // if field is empty, convert it to empty string
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  // validating school
  if (validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  // validating degree
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  // validating field of study
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field Of Study field is required";
  }

  // validating from
  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  // validating location
  if (validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  return {
    errors: errors,
    // only valid if there are no errors
    isValid: isEmpty(errors)
  };
};
