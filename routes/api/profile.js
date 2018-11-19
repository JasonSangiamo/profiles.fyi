const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Loading profile and user models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Loading input validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

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
      //populate fills out user field w user information instead of just ID
      .populate("user", ["firstName", "lastName", "avatar", "username"])
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

// @route   GET api/profile/handle/:handle
// @desc    Access user with specific handle
// @access  public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  // find profile from url handle
  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["firstName", "lastName", "avatar", "username"])
    .then(profile => {
      // check if there is no profile for this handle
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:user_id
// @desc    Access user with specific user_id
// @access  public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  // find profile from url handle
  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["firstName", "lastName", "avatar", "username"])
    .then(profile => {
      // check if there is no profile for this handle
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   POST api/profile/all
// @desc    Get all profiles
// @access  public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["firstName", "lastName", "avatar", "username"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => {
      res.status(404).json({ profile: "There are no profiles" });
    });
});

// @route   POST api/profile
// @desc    Create profile for current user
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check for validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

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

    // splitting skills into an array, remov surround whitespace
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",").map(item => {
        return item.trim();
      });
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

// @route   POST api/profiles/experience
// @desc    Add an experinece to profile of current user
// @access  private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check for validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find current user
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get fields from request
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to profile experience start of array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profiles/education
// @desc    Add education to profile of current user
// @access  private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check for validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find current user
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get fields from request
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        location: req.body.location,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to profile education start of array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience:exp_id
// @desc    Delete expereince from profile
// @access  private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get get remove index
        const removeIndex = profile.experience
          // convert to array of item ids and get index of id to delete
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // splice experience out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ experience: "Experience not found" })
      );
  }
);

// @route   DELETE api/profile/education:edu_id
// @desc    Delete education from profile
// @access  private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get get remove index
        const removeIndex = profile.education
          // convert to array of item ids and get index of id to delete
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // splice experience out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json({ education: "Education not found" }));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
