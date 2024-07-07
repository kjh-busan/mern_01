const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

router.get("/api/check-username", async (req, res) => {
  const { username } = req.query;
  const hasUsername = await Todo.findOne({ username });
  if (hasUsername) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

router.post("/api/signup", async (req, res) => {
  const { username, password, title, contents, likeCount, completed, time } =
    req.body;

  try {
    const newTodo = new Todo({
      username,
      password,
      title,
      contents,
      likeCount,
      completed,
      time,
    });

    await newTodo.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
