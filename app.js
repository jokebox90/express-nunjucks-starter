var createError = require("http-errors");
var express = require("express");
var nunjucks = require("nunjucks");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// get MongoDB driver connection
const dbo = require('./dbconn');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customersRouter = require("./routes/customers");

var app = express();

// view engine setup
app.set("view engine", "nunjucks");
nunjucks.configure(path.resolve(__dirname, "views"), {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/customers", customersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // // start the Express server
  // app.listen(PORT, () => {
  //   console.log(`Server is running on port: ${PORT}`);
  // });
});

module.exports = app;
