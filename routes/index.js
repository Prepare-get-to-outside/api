var express = require("express");
var router = express.Router();

var usersRouter = require("./user");
var restaurantRouter = require("./restaurant");
var groupRouter = require("./group");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/user", usersRouter);
router.use("/rest", restaurantRouter);
router.use("/group", groupRouter);
module.exports = router;
