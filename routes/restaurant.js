const express = require('express');
const router = express.Router();
const restaurant_controller = require("../controllers/restaurant.js");

//맛집 마스터 테이블에서 데이터 조회
router.get('/', restaurant_controller.findOne); // 맛집 조회

module.exports = router;
