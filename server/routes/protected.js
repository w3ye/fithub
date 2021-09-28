require("dotenv/config");
const express = require("express");
const { isAuth } = require("../isAuth");
const router = express.Router();

module.exports = ({ getUserById }) => {
  router.get("/", async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId !== null) {
        const { password, refresh_token, ...rest } = await getUserById(userId);
        console.log(rest);
        res.send({
          user: rest,
        });
      }
    } catch (err) {
      res.send({ error: err.message });
    }
  });

  return router;
};
