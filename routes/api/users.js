const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// loading usermodel
const User = require("../../models/User");

// all routes already start with /api/users

// @route   GET api/users/test
// @desc    Tests user route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Users API works" }));

// @route   GET api/users/register
// @desc    Register a new user
// @access  public
router.post("/register", (req, res) => {
  // first see if email is already in DB
  User.findOne({ username: req.body.username }).then(user => {
    //check if user exists
    if (user) {
      return res.status(400).json({
        useranme: "Username already exists"
      });
    }
    // this email is not taken
    else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size of the image
        r: "pg", //rating of the image (for preventing nudity, etc.)
        d: "mm" // default image if user does not have a gravatar
      });

      const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      // generating hash for password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
