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
  router.post("/:user_id/:title", (req, res) => {
    const { user_id, title } = req.params;
    db.newGroup(user_id, title)
      .then((groups) => {
        res.json({ groups, success: true });
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // ! add group could also get values from req.body
  router.post("/add_group/:group_id/:user_id", (req, res) => {
    const { group_id, user_id } = req.params;
    db.checkUserInGroup(group_id, user_id)
      .then((exists) => {
        if (!exists) {
          db.addUserToGroup(group_id, user_id)
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
