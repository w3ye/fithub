const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getWorkouts()
      .then((exercises) => res.json(exercises))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/", (req, res) => {
    const workout = req.body;
    db.newWorkout(workout)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
