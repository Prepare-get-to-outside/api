var createError = require('http-errors'); // 웹 에러 처리
var express = require('express'); // nodejs express 프레임워크
var path = require('path'); // path 경로
var cookieParser = require('cookie-parser'); // cookie 파서
var bodyParser = require('body-parser'); //body 파서
var logger = require('morgan'); // express 로그
// models sequelize 처리
const { sequelize } = require('./models');
// 테이블 
sequelize
.sync()
.then(()=>{
  console.log(" DB Connection success.");
})
.catch((err) => {
  console.error(err);
  console.log(" DB Connection error. Please make sure DB is running.");
  process.exit();
}); 

var indexRouter = require('./routes/index'); //routes index.js
var usersRouter = require('./routes/user'); //
var groupRouter = require('./routes/group'); //
var tagRouter = require('./routes/tag'); //
var restaurantRouter = require('./routes/restaurant'); //
var mylistRouter = require('./routes/mylist'); //

var app = express(); // express 선언

// view engine setup
app.set('views', path.join(__dirname, 'views')); // express views 
app.set('view engine', 'pug'); // api 서버에서 필요없음

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/group', groupRouter);
app.use('/tag', tagRouter);
app.use('/restaurant', restaurantRouter);
// app.use('/mylist', mylistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
