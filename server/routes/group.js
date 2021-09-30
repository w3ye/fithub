const express = require("express");
const router = express.Router();

module.exports = ({
  getGroups,
  getUserGroups,
  addUserToGroup,
  checkUserInGroup,
}) => {
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

  router.post("/add_group/:group_id/:user_id", (req, res) => {
    const { group_id, user_id } = req.params;
    checkUserInGroup(group_id, user_id)
      .then((exists) => {
        if (!exists) {
          addUserToGroup(group_id, user_id)
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
