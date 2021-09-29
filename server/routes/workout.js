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
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/:user_id", (req, res) => {
    const userId = req.params.user_id;
    db.findWorkoutsByUserId(userId)
      .then((result) => res.json(result))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
