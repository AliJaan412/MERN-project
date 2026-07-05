var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var swaggerSpec = require('./swagger');
var authRouter=require("./routes/authRouter")
var usersRouter = require('./routes/userRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth",authRouter);
app.use("/user",usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Route not found"));
});

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({
    error: err.message,
  });
});

module.exports = app;
