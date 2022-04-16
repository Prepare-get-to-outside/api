const createError = require("http-errors"); // 웹 에러 처리
const express = require("express"); // nodejs express 프레임워크
const path = require("path"); // path 경로
const cookieParser = require("cookie-parser"); // cookie 파서
const bodyParser = require("body-parser"); //body 파서
const logger = require("morgan"); // express 로그
const app = express(); // express 선언
// models sequelize 처리
const db = require("./models");
// 테이블
db.sequelize
  .sync()
  .then(() => {
    console.log(" DB Connection success.");
  })
  .catch((err) => {
    console.error(err);
    console.log(" DB Connection error. Please make sure DB is running.");
    process.exit();
  });

const indexRouter = require("./routes/index"); //routes index.js
const usersRouter = require("./routes/user");

// view engine setup
app.set("views", path.join(__dirname, "views")); // express views
app.set("view engine", "pug"); // api 서버에서 필요없음

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
