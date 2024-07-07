const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    required: false,
    default: 0,
  },
  contents: {
    type: String,
    required: true,
  },
  completed: { type: Boolean, default: false },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Todo", TodoSchema);
