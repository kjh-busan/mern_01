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
  title: {
    type: String,
    required: false,
  },
  likeCount: {
    type: Number,
    required: false,
    default: 0,
  },
  contents: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
