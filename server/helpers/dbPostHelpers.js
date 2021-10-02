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
      text: "SELECT * FROM comments WHERE workout_id = $1",
      values: [workoutId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
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

  return { getGroupWorkouts, getCommentsForWorkout, getLikesForWorkout };
};
