var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var contributorRouter = require('./routes/ContributorRouter');
var prefectureRouter = require('./routes/PrefectureRouter');
var authRouter = require('./routes/AuthRouter');
var filesRouter = require('./routes/FilesRouter');
var adminRouter = require('./routes/AdminRouter');
var commercialRouter = require('./routes/CommercialRouter');
var cosifRouter = require('./routes/COSIFRouter');
var cosipRouter = require('./routes/COSIPRouter');
var erbRouter = require('./routes/ERBRouter');
var hiredRouter = require('./routes/HiredRouter');
var ownIssRouter = require('./routes/OwnISSRouter');
var substituteIssRouter = require('./routes/SubstituteISSRouter');

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
app.use(cors());

// error cors handlind
const allowedOrigins = [
  'http://cefitem.net',
  'http://localhost',
  'http://localhost:8080',
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

app.use('/', cors(corsOptions), indexRouter);
app.use('/contributor', cors(corsOptions), contributorRouter);
app.use('/prefecture', cors(corsOptions), prefectureRouter);
app.use('/auth', cors(corsOptions), authRouter);
app.use('/files', cors(corsOptions), filesRouter);
app.use('/admin', cors(corsOptions), adminRouter);
app.use('/commercial', cors(corsOptions), commercialRouter);
app.use('/cosif', cors(corsOptions), cosifRouter);
app.use('/cosip', cors(corsOptions), cosipRouter);
app.use('/erb', cors(corsOptions), erbRouter);
app.use('/hired', cors(corsOptions), hiredRouter);
app.use('/own-iss', cors(corsOptions), ownIssRouter);
app.use('/substitute-iss', cors(corsOptions), substituteIssRouter);

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
