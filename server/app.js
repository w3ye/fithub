const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/users", usersRouter(dbHelpers));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;