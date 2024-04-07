const express = require("express");
const router = express.Router();
const User = require("../../models/User"); // User 모델 경로에 맞게 조정

// '/api/users' 경로로 GET 요청이 오면 실행될 핸들러
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // 모든 사용자 조회
    console.log(users); // 콘솔창에 출력
    res.json(users); // 클라이언트에게도 결과 전송
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
