var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/UserRouter');
var prefectureRouter = require('./routes/PrefectureRouter');
var economicActivityRouter = require('./routes/EconomicActivityRouter');
var authRouter = require('./routes/AuthRouter');
var filesRouter = require('./routes/FilesRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// error cors handlind
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8100',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

app.options('*', cors(corsOptions));

app.use('/',cors(corsOptions), indexRouter);
app.use('/user',cors(corsOptions), userRouter);
app.use('/prefecture',cors(corsOptions), prefectureRouter);
app.use('/economic-activity',cors(corsOptions), economicActivityRouter);
app.use('/auth',cors(corsOptions), authRouter);
app.use('/files',cors(corsOptions), filesRouter);

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
