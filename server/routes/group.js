const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getGroups()
      .then((groups) => res.json(groups))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/:user_id", (req, res) => {
    const userId = req.params.user_id;
    db.getUserGroups(userId)
      .then((groups) => {
        res.json(groups);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // ! title will be changed to take value from req.body
  router.post("/new_group", (req, res) => {
    const { userId, title } = req.body;
    db.newGroup(userId, title)
      .then((groups) => {
        res.json({ groups, success: true });
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // ! add group could also get values from req.body
  router.post("/add_group", (req, res) => {
    const { groupId, userId } = req.body;
    db.checkUserInGroup(groupId, userId)
      .then((exists) => {
        if (!exists) {
          db.addUserToGroup(groupId, userId)
            .then((groups) => {
              res.json(groups);
            })
            .catch((err) => {
              res.json({ error: err.message });
            });
        } else throw new Error("user already exists in group");
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  return router;
};
