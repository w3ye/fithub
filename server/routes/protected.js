require("dotenv/config");
const express = require("express");
const { isAuth } = require("../isAuth");
const router = express.Router();

module.exports = ({ getUserById, getUserGroups }) => {
  router.get("/", async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId !== null) {
        const { password, refresh_token, ...rest } = await getUserById(userId);
        res.send({
          user: rest,
          groups: await getUserGroups(userId),
        });
      }
    } catch (err) {
      res.send({ error: err.message });
    }
  });

  return router;
};
