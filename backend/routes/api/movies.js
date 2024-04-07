const express = require("express");
const router = express.Router();
const Movie = require("../../models/Movie"); // Movie 모델 경로에 맞게 조정

// '/api/movies' 경로로 GET 요청을 처리
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10; // 쿼리에서 limit 값을 받아오고, 없다면 기본값으로 10을 사용
    const movies = await Movie.find().limit(limit); // 데이터베이스에서 영화 데이터를 조회하되, limit 값을 적용
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
