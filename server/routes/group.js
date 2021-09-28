const express = require("express");
const router = express.Router();

module.exports = ({ getGroups, getUserGroups }) => {
  router.get("/", (req, res) => {
    getGroups()
      .then((groups) => res.json(groups))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/:user_id", (req, res) => {
    const userId = req.params.user_id;
    getUserGroups(userId)
      .then((groups) => {
        res.json(groups);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  return router;
};
