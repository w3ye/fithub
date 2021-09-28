const db = require("../db");
const { getUserById } = require("./dbUserHelpers")(db);

module.exports = {
  getUserById,
};
