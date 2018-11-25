if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
module.exports = {
  mongoURI:
    "mongodb://admin-gwpw-911:gcvpkdx=h911@ds035907.mlab.com:35907/profilesfyi",
  secretOrKey: "secret"
};
