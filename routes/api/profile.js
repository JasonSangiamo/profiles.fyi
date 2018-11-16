const express = require("express");
const router = express.Router();

// all routes already start with /api/profile
router.get("/test", (req, res) => res.json({ msg: "Profile API works" }));

module.exports = router;
