require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const router = express.Router();

module.exports = ({ getUsers, getUserByEmail, addUser }) => {
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
    const user = await getUserByEmail(email);
    if (user) {
      res.json({
        message: "User with this email already exists",
      });
    } else {
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
  });

  return router;
};
