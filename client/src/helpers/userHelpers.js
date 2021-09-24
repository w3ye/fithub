import axios from "axios";

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
  if (user.password === password) return true;
  return false;
}
