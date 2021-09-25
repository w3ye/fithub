import axios from "axios";
const bcrypt = require("bcryptjs");

/**
 * find a user with email
 * @param {string} email
 * @returns {Promise} - result from the database
 */
export function findEmail(email) {
  return axios(`/api/users/${email}`)
    .then((result) => {
      return result.data.user;
    })
    .catch((err) => {
      return err;
    });
}

/**
 * compare the hashed password from the user object with password parameter
 * @param {Object} user
 * @param {string} password
 * @returns {boolean} - true: if the password match
 */
export function validateUser(user, password) {
  if (bcrypt.compareSync(password, user.password)) {
    return true;
  }
  return false;
}
