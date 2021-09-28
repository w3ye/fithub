const express = require("express");
const router = express.Router();

module.exports = ({ getFriends }) => {
  router.get("/", (req, res) => {
    getFriends()
      .then((friends) => res.json(friends))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
