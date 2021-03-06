const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.getRequestsById(req.params.id)
      .then((friend_requests) => res.json(friend_requests))
      .catch((err) => res.json({ error: err.message }));
  });

  router.put("/:request_id", (req, res) => {
    const request_id = req.params.request_id;
    db.acceptRequest(request_id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const request = req.body;
    db.newRequest(request)
      .then((result) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  return router;
};
