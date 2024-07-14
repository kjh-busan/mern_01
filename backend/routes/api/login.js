const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  const hasUsername = await User.findOne({ username });
  if (hasUsername) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

module.exports = router;
