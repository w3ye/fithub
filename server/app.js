const db = require("./db");
const dbUserHelpers = require("./helpers/dbUserHelpers")(db);
const dbGroupHelpers = require("./helpers/dbGroupHelpers")(db);
const dbFriendHelpers = require("./helpers/dbFriendHelpers")(db);
const dbExerciseHelpers = require("./helpers/dbExerciseHelpers")(db);
const dbProtectedHelpers = require("./helpers/dbProtectedHelpers");
const dbFriendRequestHelpers = require("./helpers/dbFriendRequestHelpers")(db);

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var protectedRouter = require("./routes/protected");
var groupsRouter = require("./routes/group");
var friendsRouter = require("./routes/friends");
var friendRequestRouter = require("./routes/friend_requests");
var exercisesRouter = require("./routes/exercises");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/users", usersRouter(dbUserHelpers));
app.use("/api/protected", protectedRouter(dbProtectedHelpers));
app.use("/api/groups", groupsRouter(dbGroupHelpers));
app.use("/api/friends", friendsRouter(dbFriendHelpers));
app.use("/api/exercises", exercisesRouter(dbExerciseHelpers));
app.use("/api/frequests", friendRequestRouter(dbFriendRequestHelpers));
app.use("/", indexRouter);

module.exports = app;
