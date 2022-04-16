const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.js");

/* GET users listing. */
// get, post, put, delete 개발
router.post("/", user_controller.create);

router.get("/", user_controller.findAll);

router.get("/:user_cd", user_controller.findOne);

router.put("/:user_cd", user_controller.update);

router.delete("/:user_cd", user_controller.delete);

module.exports = router;
