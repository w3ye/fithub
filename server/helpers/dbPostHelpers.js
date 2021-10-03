module.exports = (db) => {
  const getGroupWorkouts = (groupId) => {
    const query = {
      text: "SELECT * FROM workout_groups WHERE group_id = $1",
      values: [groupId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCommentsForWorkout = (workoutId) => {
    const query = {
      text: "SELECT * FROM user_comments WHERE workout_id = $1",
      values: [workoutId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const newComments = (userId, workoutId, message) => {
    const query = {
      text: `
        INSERT INTO comments (user_id, workout_id, message)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      values: [userId, workoutId, message],
    };

    return db
      .query(query)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return err;
      });
  };

  const updateComments = (commentId, message) => {
    const query = {
      text: "UPDATE comments SET message = $1 WHERE id = $2 RETURNING *;",
      values: [message, commentId],
    };

    return db
      .query(query)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return err;
      });
  };

  const deleteComment = (commentId) => {
    const query = {
      text: "DELETE FROM comments WHERE id = $1",
      values: [commentId],
    };

    return db
      .query(query)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return err;
      });
  };

  const getLikesForWorkout = (workoutId) => {
    const query = {
      text: "SELECT * FROM likes WHERE workout_id = $1",
      values: [workoutId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const newLikes = (userId, workoutId) => {
    const query = {
      text: `
        INSERT INTO likes (user_id, workout_id)
        VALUES ($1, $2)
        RETURNING *
      `,
      values: [userId, workoutId],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const deleteLike = (likeId) => {
    const query = {
      text: "DELETE FROM likes WHERE id = $1 RETURNING *;",
      values: [likeId],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getGroupWorkouts,
    getCommentsForWorkout,
    getLikesForWorkout,
    newComments,
    updateComments,
    deleteComment,
    newLikes,
    deleteLike,
  };
};
