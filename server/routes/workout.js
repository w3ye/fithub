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
    db.getWorkoutsByUserId(userId)
      .then((result) => res.json(result))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/wid/:workout_id", (req, res) => {
    const workoutId = req.params.workout_id;
    db.getWorkout(workoutId)
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.delete("/:workout_id", (req, res) => {
    const workoutId = req.params.workout_id;
    db.deleteWorkout(workoutId)
      .then((result) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.patch("/:workout_id", (req, res) => {
    const workoutId = req.params.workout_id;
    const workout = req.body;
    db.updateWorkout(workoutId, workout)
      .then((result) => {
        res.json({ result, success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  return router;
};
