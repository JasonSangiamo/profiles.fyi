const express = require("express");
const router = express.Router();

// all routes already start with /api/profile

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Profile API works" }));

module.exports = router;
