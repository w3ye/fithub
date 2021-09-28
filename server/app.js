const db = require("./db");
const dbUserHelpers = require("./helpers/dbUserHelpers")(db);
const dbProtectedHelpers = require("./helpers/dbProtectedHelpers");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var protectedRouter = require("./routes/protected");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/users", usersRouter(dbUserHelpers));
app.use("/api/protected", protectedRouter(dbProtectedHelpers));

app.use("/", indexRouter);

module.exports = app;
