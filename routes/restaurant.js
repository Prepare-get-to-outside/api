const express = require('express');
const router = express.Router();
const cors = require('cors');
const restaurant_controller = require("../controllers/restaurant.js");

router.use(cors());

router.post('/', restaurant_controller.create);

router.get('/', restaurant_controller.findAll);

module.exports = router;