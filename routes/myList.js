const express = require('express');
const router = express.Router();

const myList_controller = require("../controllers/myList.js");

// get, post, put, delete 개발
router.post('/', myList_controller.create);

router.get('/all', myList_controller.findAll);

router.get('/', myList_controller.findOne);

router.get('/:user_cd', myList_controller.findAllByUser);

router.delete('/', myList_controller.delete);

module.exports = router;
