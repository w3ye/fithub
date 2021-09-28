const db = require("../db");
const { getUserById } = require("./dbUserHelpers")(db);
const { getUserGroups } = require("./dbGroupHelpers")(db);
const { getFriendsByUserId } = require("./dbFriendHelpers")(db);

module.exports = {
  getUserById,
  getUserGroups,
  getFriendsByUserId,
};
