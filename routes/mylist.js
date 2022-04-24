const express = require('express');
const router = express.Router();
const mylist_controller = require("../controllers/mylist.js");

//맛집 등록(마이리스트 테이블에 등록)
router.post('/', mylist_controller.create); // 맛집 등록

router.get('/', mylist_controller.findOne); // 맛집 조회

router.put('/', mylist_controller.update); // 맛집 수정

router.delete('/', mylist_controller.delete); // 맛집 삭제

module.exports = router;
