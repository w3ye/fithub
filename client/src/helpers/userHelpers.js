import axios from "axios";
const bcrypt = require("bcryptjs");

export function findEmail(email) {
  return axios(`/api/users/${email}`)
    .then((result) => {
      return result.data.user;
    })
    .catch((err) => {
      return err;
    });
}

export function validateUser(user, password) {
  if (bcrypt.compareSync(password, user.password)) {
    return true;
  }
  return false;
}
