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

  router.post("/add_friend/:sender_id/:reciever_id", (req, res) => {
    const { sender_id, reciever_id } = req.params;
    db.addFriends(sender_id, reciever_id)
      .then((result) => {
        console.log("Result:", result);
        db.addFriends(reciever_id, sender_id)
          .then((friends) => res.json({ friends, result }))
          .catch((err) => res.json({ error: err.message }));
      })
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
