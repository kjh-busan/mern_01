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

router.get("/", async (req, res) => {
  const { username } = req.query;
  try {
    if (!username) {
      return res.status(400).send("Username is required");
    }

    const todos =
      username === "admin" ? await Todo.find() : await Todo.find({ username });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Server error");
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

    console.log("[BE] updateTodo:", todo);
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
