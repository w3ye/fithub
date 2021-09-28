const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getFriends()
      .then((friends) => res.json(friends))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/:user_id", (req, res) => {
    const userId = req.params.user_id;
    db.getFriendsByUserId(userId)
      .then((friends) => res.json(friends))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
