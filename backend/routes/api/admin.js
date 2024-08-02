const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");

router.get("/admin/stats", async (req, res) => {
  try {
    const users = await User.find({});
    const stats = await Promise.all(
      users.map(async (user) => {
        const todos = await Todo.find({ userId: user._id });
        const completedTodos = todos.filter((todo) => todo.completed).length;
        return {
          username: user.username,
          totalTodos: todos.length,
          completedTodos: completedTodos,
        };
      })
    );
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
