module.exports = (db) => {
  const getWorkouts = () => {
    const query = {
      text: "SELECT * FROM workouts",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const newWorkout = (workout) => {
    const { userId, title, groups, exercises } = workout;
    const groupIds = groups.map((element) => {
      return element.id;
    });
    const query = {
      text: `
        INSERT INTO workouts (title, user_id, group_ids, exercises)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
      `,
      values: [title, userId, groupIds, exercises],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateWorkout = (workoutId, workout) => {
    const { title, groups, exercises } = workout;
    const groupIds = groups.map((element) => element.id);
    const query = {
      text: `
        UPDATE workouts
        SET title = $1, group_ids = $2, exercises = $3
        WHERE id = $4
        RETURNING *;
      `,
      values: [title, groupIds, exercises, workoutId],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getWorkoutsByUserId = (userId) => {
    const query = {
      text: `
        SELECT 
        id,
        title,
        group_ids,
        exercises
        FROM workouts 
        where user_id = $1`,
      values: [userId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const deleteWorkout = (workoutId) => {
    const query = {
      text: "DELETE FROM workouts WHERE id = $1 RETURNING *;",
      values: [workoutId],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getWorkouts,
    newWorkout,
    getWorkoutsByUserId,
    deleteWorkout,
    updateWorkout,
  };
};
