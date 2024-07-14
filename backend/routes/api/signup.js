const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.post("/", async (req, res) => {
  const { username, password, time } = req.body;

  try {
    const newUser = new User({
      username,
      password,
      title,
      contents,
      likeCount,
      completed,
      time,
    });

    console.log("New User object:", newUser);

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
