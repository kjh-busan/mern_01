const express = require("express");
const router = express.Router();
const Todo = require("../../models/Todo");

router.post("/", async (req, res) => {
  const { username, title, contents, likeCount, completed, time } = req.body;
  console.log("#1 [CREATE]:", username, title, contents);

  try {
    const newTodo = new Todo({
      username,
      title,
      contents,
      likeCount,
      completed,
      time,
    });

    const result = await newTodo.save();

    res.status(201).json(result);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/check-username", async (req, res) => {
  const { username } = req.query;
  const hasUsername = await User.findOne({ username });
  if (hasUsername) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

router.post("/api/signup", async (req, res) => {
  const { username, password, title, contents, time } = req.body;

  try {
    const newTodo = new Todo({
      username,
      password,
      title,
      contents,
      time,
    });

    await newTodo.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
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
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { title, contents, likeCount, completed } = req.body;
  try {
    let todo = await Todo.findById(userId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title) {
      todo.title = title;
    }
    if (contents) {
      todo.contents = contents;
    }
    if (likeCount) {
      todo.likeCount = likeCount;
    }
    if (completed !== undefined && completed !== null) {
      todo.completed = completed;
    }

    console.log("[BE ]updateTodo:", todo);
    const updateTodo = await todo.save();

    res.status(200).json(updateTodo);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("#4 [DELETE] userId:", userId);

  try {
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
