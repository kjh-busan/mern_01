const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();
connectDB();
dotenv.config();

app.use(
  express.json({
    extended: false,
  })
);
// node.jsにてjsonファイルを使用するため（必須ではない？）
app.use(
  express.json({
    extended: false,
  })
);
app.use(cors()); // 全てのdomain要求を許可

app.listen(PORT, () => {
  // console.log(`start! express server on port ${PORT}`);
});

// API Server List
app.use("/api/todos", require("./routes/api/todos"));
app.use("/api/signup", require("./routes/api/signup"));
