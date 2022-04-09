const express = require("express");
const router = express.Router();
const cors = require("cors");
const restaurant_controller = require("../controllers/restaurant.js");
const restaurant_info_controller = require("../controllers/restInfo.js");

router.use(cors());

router.post("/", restaurant_controller.create);

router.get("/", restaurant_controller.findAll);

router.get("/restinfo", restaurant_info_controller.findAll);
router.post("/restinfo", restaurant_info_controller.create);

module.exports = router;
