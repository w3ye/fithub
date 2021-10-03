const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/new", (req, res) => {
    const { workoutId, groupId } = req.body;
    db.newPost(workoutId, groupId)
      .then((result) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

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
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.patch("/comments/:comment_id", (req, res) => {
    const commentId = req.params.comment_id;
    const { message } = req.body;
    db.updateComments(commentId, message)
      .then((result) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.delete("/comments/:comment_id", (req, res) => {
    const commentId = req.params.comment_id;
    db.deleteComment(commentId)
      .then((result) => {
        res.json({ success: true });
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

  router.post("/likes/new", (req, res) => {
    const { workoutId, userId } = req.body;
    db.newLikes(userId, workoutId)
      .then((result) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.delete("/likes/:like_id", (req, res) => {
    const likeId = req.params.like_id;
    db.deleteLike(likeId)
      .then((result) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  return router;
};
