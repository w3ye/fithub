const db = require("../db");
const { getUserById } = require("./dbUserHelpers")(db);
const { getUserGroups } = require("./dbGroupHelpers")(db);

module.exports = {
  getUserById,
  getUserGroups,
};
