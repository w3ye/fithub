require("dotenv/config");
const express = require("express");
const { isAuth } = require("../isAuth");
const router = express.Router();

module.exports = ({ getUserById, getUserGroups, getFriendsByUserId }) => {
  router.get("/", async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId !== null) {
        const { password, refresh_token, ...rest } = await getUserById(userId);
        res.send({
          user: rest,
          groups: await getUserGroups(userId),
          friends: await getFriendsByUserId(userId),
        });
      }
    } catch (err) {
      res.send({ error: err.message });
    }
  });

  return router;
};
