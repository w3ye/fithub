import axios from "axios";

/**
 * Register a user
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export function registerUser(firstName, lastName, email, password) {
  return axios
    .post("/api/users", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {});
}
