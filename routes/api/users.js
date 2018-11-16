const express = require("express");
const router = express.Router();

// all routes already start with /api/users

// @route   GET api/users/test
// @desc    Tests user route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Users API works" }));

module.exports = router;
