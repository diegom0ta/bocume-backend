var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var marmitariaRouter = require('./routes/marmitariaRouter');
var menuRouter = require('./routes/menuRouter');
var purchaseRouter = require('./routes/purchaseRouter');
var favoriteRouter = require('./routes/favoriteRouter');

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(
	(db) => {
		console.log('Connected to server.', db);
	},
	(err) => {
		console.log(err);
	}
);

var app = express();

app.all('*', (req, res, next) => {
	if (req.secure) return next();
	else {
		res.redirect(
			307,
			'https://' + req.hostname + ':' + app.get('secPort') + req.url
		);
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/marmitaria', marmitariaRouter);
app.use('/menu', menuRouter);
app.use('/purchase', purchaseRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
