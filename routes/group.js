const express = require("express");
const router = express.Router();
const cors = require("cors");
const group_controller = require("../controllers/group.js");

router.use(cors());

// get, post, put, delete 개발
router.post("/", group_controller.create);

router.get("/", group_controller.findAll);

// router.get('/:user_cd', user_controller.findOne);

// router.put('/:user_cd', user_controller.update);

// router.delete('/:user_cd', user_controller.delete);

module.exports = router;
