require("dotenv/config");
const express = require("express");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { route } = require(".");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../tokens");
const { isAuth } = require("../isAuth");
const router = express.Router();

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  updateRefreshToken,
  getUserById,
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

  router.post("/logout", (_req, res) => {
    res.clearCookie("refreshtoken", { path: "/api/users/refresh_token" });
    return res.send({
      message: "Logged out",
    });
  });

  router.post("/protected", async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId !== null) {
        res.send({
          data: "this is protected data",
        });
      }
    } catch (err) {
      res.send({ error: err.message });
    }
  });

  router.post("/refresh_token", async (req, res) => {
    const token = req.cookies.refreshtoken;
    if (!token) res.send({ accessToken: "" });
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.send({ accessToken: "" });
    }
    const user = await getUserById(payload.userId);
    if (!user || user.refresh_token !== token) res.send({ accessToken: "" });

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    updateRefreshToken(user.id, refreshToken);
    sendRefreshToken(res, refreshToken);
    return res.send({ accessToken });
  });

  router.get("/:email", (req, res) => {
    const email = req.params.email;

    getUserByEmail(email)
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        res.send(err);
      });
  });

  return router;
};
