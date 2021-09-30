const db = require("../db");
const { getUserById } = require("./dbUserHelpers")(db);
const { getUserGroups } = require("./dbGroupHelpers")(db);
const { getFriendsByUserId } = require("./dbFriendHelpers")(db);
const { getWorkoutsByUserId } = require("./dbWorkoutHelpers")(db);

module.exports = {
  getUserById,
  getUserGroups,
  getFriendsByUserId,
  getWorkoutsByUserId,
};
