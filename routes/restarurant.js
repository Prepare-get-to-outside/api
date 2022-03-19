const express = require('express');
const router = express.Router();

const restaurant_controller = require("../controllers/restaurant.js");

// get, post, put, delete 개발
router.post('/', restaurant_controller.create);

router.get('/', restaurant_controller.findAll);

router.get('/:rest_cd', restaurant_controller.findOne);

router.put('/:rest_cd', restaurant_controller.update);

router.delete('/:rest_cd', restaurant_controller.delete);

module.exports = router;
