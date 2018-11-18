const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // if field is empty, convert it to empty string
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  // validating handle
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  // validating status
  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  // validating skills
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  // validating bio
  if (validator.isEmpty(data.bio)) {
    errors.bio = "Bio field is required";
  }

  // validating website
  if (!isEmpty(data.website)) {
    // if user entered in website, check if it is a valid URL
    if (!validator.isURL(data.webiste)) {
      errors.website = "Please enter a valid URL";
    }
  }

  // validating website
  if (!isEmpty(data.linkedin)) {
    // if user entered in website, check if it is a valid URL
    if (!validator.isURL(data.linkedin)) {
      errors.website = "Please enter a valid URL";
    }
  }

  return {
    errors: errors,
    // only valid id there are no errors
    isValid: isEmpty(errors)
  };
};
