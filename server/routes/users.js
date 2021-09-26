require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { route } = require(".");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../tokens");
const router = express.Router();

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  updateRefreshToken,
}) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
      const user = await getUserByEmail(email);
      if (user) throw new Error("User already exists");
      else {
        const hashedPassword = await hash(password, 10);
        const newUser = await addUser(
          first_name,
          last_name,
          email,
          hashedPassword
        );
        if (!newUser) res.json({ error: err.message });
        res.json(newUser);
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await getUserByEmail(email);
      if (!user) throw new Error("User does not exist");
      const valid = await compare(password, user.password);
      if (!valid) throw new Error("Incorrect Password");
      // refresh and access token
      const accessToken = createAccessToken(user.id);
      const refreshToken = createRefreshToken(user.id);
      updateRefreshToken(user.id, refreshToken);
      sendRefreshToken(res, refreshToken);
      sendAccessToken(req, res, accessToken);
    } catch (err) {
      res.json({ errror: err.message });
    }
  });

  return router;
};
