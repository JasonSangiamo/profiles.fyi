const express = require("express");
const router = express.Router();

// all routes already start with /api/users
router.get("/test", (req, res) => res.json({ msg: "Users API works" }));

module.exports = router;
