// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

const connectDB = require("./config/db");
const dotenv = require("dotenv");
// const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
console.log("PORT: " + PORT);

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();
connectDB();
dotenv.config(); // .env 파일을 사용(패키지 설치 필요)

// app.use(express.urlencoded({ extended: true })); // urlencoded 형식으로 파라미터를 전달한다.

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
// 5001 포트로 서버 오픈
app.listen(PORT, () => {
  console.log(`start! express server on port ${PORT}`);
});

app.use("/api/users", require("./routes/api/users")); // 경로에 맞게 조정
