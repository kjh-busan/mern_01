const express = require("express");
const router = express.Router();
const User = require("../../models/User"); // User 모델 경로에 맞게 조정

// '/api/users' 경로로 GET 요청이 오면 실행될 핸들러
router.get("/", async (req, res) => {
  const { name } = req.query; // 쿼리 파라미터에서 'name' 추출
  try {
    let query = {};

    // 이름으로 검색하는 경우, 쿼리 객체 수정
    if (name) {
      query.name = new RegExp(name, "i"); // 대소문자를 구분하지 않는 정규 표현식
    }

    const users = await User.find(query); // 수정된 쿼리 객체를 사용하여 사용자 조회
    console.log("#1 검색name:", name); // 콘솔창에 출력
    res.json(users); // 클라이언트에게도 결과 전송
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id; // 라우트 경로에서 매개변수를 읽어옵니다.
  console.log("#4 [DELETE] userId:", userId);

  try {
    // MongoDB에서 해당 ID를 가진 유저를 찾아서 삭제합니다.
    const result = await User.deleteOne({ _id: userId }).exec();

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
