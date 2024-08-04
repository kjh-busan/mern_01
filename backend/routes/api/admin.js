const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

// 전체 유저의 TODO를 가져오는 API
router.get("/stats", async (req, res) => {
  // 수정된 경로
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

module.exports = router;
