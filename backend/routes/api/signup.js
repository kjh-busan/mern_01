const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

router.post("/", async (req, res) => {
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

    console.log("New Todo object:", newTodo);

    await newTodo.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
