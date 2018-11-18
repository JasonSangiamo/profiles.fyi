const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Loading profile and user models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// all routes already start with /api/profile

// @route   GET api/profile
// @desc    Get current user's profile
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // get current user
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(errors));
  }
);

// @route   POST api/profile
// @desc    Create profile for current user
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields from request
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;
    if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;

    // splitting skills into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Finding current user
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // if profile already exists, this is an update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create new profile

        // confirm that handle does not exist yet for slug
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            // handle already taken
            errors.handle = "That handle is already taken";
            rest.status(400).json(errors);
          } else {
            // save profile if handle not taken
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        });
      }
    });
  }
);

module.exports = router;
