const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo"); // 수정: Todo로 변경

router.post("/", async (req, res) => {
  const { username, title, contents, likeCount, completed, time } = req.body;
  console.log("#1 [CREATE]:", username, title, contents);

  try {
    // 새로운 사용자 문서 생성
    const newTodo = new Todo({
      username,
      title,
      contents,
      likeCount,
      completed,
      time,
    });

    // MongoDB create new Todo
    const result = await newTodo.save();

    res.status(201).json(result); // 삽입된 TODO 정보를 클라이언트에게 응답
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const { username, title, contents, likeCount, completed, time } = req.body;

  try {
    let query = {};

    if (username) {
      query.username = new RegExp(username, "i");
    }
    const todos = await Todo.find(query);
    res.json(todos);
    console.log(
      "#2 [READ] Status:",
      todos.length > 0 ? todos[0].status : "No todos found"
    );
  } catch (err) {
    console.error("에러: ", err.message);
    res.status(500).send("Server Error에러");
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id; // 라우트 경로에서 사용자 ID를 읽어옵니다.
  const { username, title, contents, likeCount, completed, time } = req.body;
  // console.log("#3 [UPDATE]:", username, title, contents, likeCount, completed);
  try {
    // MongoDB에서 해당 ID를 가진 사용자를 찾습니다.
    let todo = await Todo.findById(userId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // 클라이언트에서 전달된 필드가 있는 경우에만 업데이트합니다.
    if (title) {
      todo.title = title;
    }
    if (contents) {
      todo.contents = contents;
    }
    if (likeCount) {
      todo.likeCount = likeCount;
    }
    if (completed) {
      todo.completed = completed;
    }

    // 업데이트된 사용자 정보를 저장합니다.
    const updateTodo = await todo.save();

    console.log("[BE ]updateTodo:", todo);
    res.status(200).json(updateTodo); // 업데이트된 사용자 정보를 클라이언트에게 응답합니다.
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id; // 라우트 경로에서 매개변수를 읽어옵니다.
  console.log("#4 [DELETE] userId:", userId);

  try {
    // MongoDB에서 해당 ID를 가진 유저를 찾아서 삭제합니다.
    const result = await Todo.deleteOne({ _id: userId }).exec();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
