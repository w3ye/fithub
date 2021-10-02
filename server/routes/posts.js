const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:group_id", (req, res) => {
    const groupId = req.params.group_id;
    db.getGroupWorkouts(groupId)
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/comments/:workout_id", (req, res) => {
    const workoutId = req.params.workout_id;
    db.getCommentsForWorkout(workoutId)
      .then((comments) => {
        res.json(comments);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.post("/comments/new", (req, res) => {
    const { workoutId, userId, message } = req.body;
    db.newComments(userId, workoutId, message)
      .then((result) => {
        res.json({ result, success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/likes/:workout_id", (req, res) => {
    const workoutId = req.params.workout_id;
    db.getLikesForWorkout(workoutId)
      .then((likes) => {
        res.json(likes);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  return router;
};
