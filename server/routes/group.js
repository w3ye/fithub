const express = require("express");
const router = express.Router();

module.exports = ({ getGroups }) => {
  router.get("/", (req, res) => {
    getGroups()
      .then((groups) => res.json(groups))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
