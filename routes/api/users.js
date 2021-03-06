const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Loading input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// loading usermodel
const User = require("../../models/User");

// all routes already start with /api/users

// @route   GET api/users/test
// @desc    Tests user route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Users API works" }));

// @route   POST api/users/register
// @desc    Register a new user
// @access  public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // check if there were any errors
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // first see if email is already in DB
  User.findOne({ username: req.body.username }).then(user => {
    //check if user exists
    if (user) {
      return res.status(400).json({
        username: "Username already exists"
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

// @route   POST api/users/login
// @desc    Logs in a user, returns JWT
// @access  public
router.post("/login", (req, res) => {
  // validating input
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // find user by username
  User.findOne({ username }).then(user => {
    // Check for user
    if (!user) {
      errors.username = "Username not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Correct login info

        // Create payload to be held in token
        const payload = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        };

        // Sign JWT token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/users/current
// @desc    Returns currently authenticated user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // all user info now in request.user, sending this back as JSON response
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

module.exports = router;
