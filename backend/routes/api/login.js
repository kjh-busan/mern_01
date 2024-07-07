const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  try {
    const hasUsername = await Todo.findOne({ username });
    if (hasUsername) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
