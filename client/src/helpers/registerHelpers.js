import axios from "axios";

/**
 * Register a user
 * @param {Object} user
 * @returns {Promise}
 */
export function registerUser(user) {
  return axios
    .post("/api/users", {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}
