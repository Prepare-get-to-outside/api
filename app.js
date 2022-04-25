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

var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/user');
var restaurantRouter = require('./routes/restarurant');
var groupRouter = require('./routes/group');

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
app.use('/restaurant', restaurantRouter);
app.use('/groups', groupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404 handler')
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log('error handler >>>',err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
