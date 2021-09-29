const express = require("express");
const { route } = require(".");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getExercises()
      .then((exercises) => res.json(exercises))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/:name", (req, res) => {
    const name = req.params.name;
    db.findExercisesByName(name)
      .then((exercises) => {
        res.json(exercises);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
