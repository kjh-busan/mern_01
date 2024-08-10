const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");
const User = require("../../models/User");

router.get("/stats", async (req, res) => {
  try {
    const todos = await Todo.find({});
    const userStats = todos.reduce((acc, todo) => {
      const username = todo.username;
      if (!acc[username]) {
        acc[username] = {
          username: username,
          totalTodos: 0,
          completedTodos: 0,
        };
      }
      acc[username].totalTodos += 1;
      if (todo.completed) {
        acc[username].completedTodos += 1;
      }
      return acc;
    }, {});

    const statsArray = Object.values(userStats);
    res.json(statsArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isAdmin = user.username === "admin";

    const users = await User.find({}).select("username -_id");

    res.json({ isAdmin, users: users.map((u) => u.username) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
