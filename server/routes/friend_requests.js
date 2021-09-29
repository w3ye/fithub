const express = require("express");
const router = express.Router();

module.exports = ({ getRequestsById }) => {
  router.get("/:id", (req, res) => {
    getRequestsById(req.params.id)
      .then((friend_requests) => res.json(friend_requests))
      .catch((err) => res.json({ error: err.message }));
  });
  return router;
};
