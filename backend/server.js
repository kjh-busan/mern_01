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
// node.js에서 json 파일을 사용할때 필요(필수는 아닌듯)
app.use(
  express.json({
    extended: false,
  })
);
app.use(cors()); // 모든 도메인에서의 요청을 허용

app.listen(PORT, () => {
  console.log(`start! express server on port ${PORT}`);
});

// API Server List
app.use("/api/todos", require("./routes/api/todos"));
