const express = require('express');
const router = express.Router();
const restaurant_controller = require("../controllers/restaurant.js");

//맛집 마스터 테이블에서 데이터 조회
router.post('/', restaurant_controller.create); // 맛집 추가
router.get('/', restaurant_controller.findOne); // 맛집 조회

router.post('/group', restaurant_controller.createGroup); // 맛집그룹 등록
// router.get('/group', restaurant_controller.findOne); // 맛집그룹 조회
// router.put('/group', restaurant_controller.findOne); // 맛집그룹 수정
// router.delete('/group', restaurant_controller.findOne); // 맛집그룹 삭제

module.exports = router;
