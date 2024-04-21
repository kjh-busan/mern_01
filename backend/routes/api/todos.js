const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo"); // 수정: Todo로 변경

router.get("/", async (req, res) => {
  const { username, title, contents, likeCount, completed, time } = req.body;

  try {
    let query = {};

    if (username) {
      query.username = new RegExp(username, "i");
    }
    const todos = await Todo.find(query); // 수정: Todo로 변경
    res.json(todos);
    console.log("#2 [READ] Status:", todos.status); // 주의: todos는 배열이므로 status 속성에 접근할 수 없습니다.
  } catch (err) {
    console.error("에러: ", err.message);
    res.status(500).send("Server Error에러");
  }
});

module.exports = router;
