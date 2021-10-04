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

  const getWorkout = (workoutId) => {
    const query = {
      text: "SELECT * FROM workouts WHERE id = $1",
      values: [workoutId],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const newWorkout = (workout) => {
    const { userId, title, exercises } = workout;
    const query = {
      text: `
        INSERT INTO workouts (title, user_id, exercises)
        VALUES
        ($1, $2, $3)
        RETURNING *;
      `,
      values: [title, userId, exercises],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateWorkout = (workoutId, workout) => {
    const { title, exercises } = workout;
    const query = {
      text: `
        UPDATE workouts
        SET title = $1, exercises = $2
        WHERE id = $3
        RETURNING *;
      `,
      values: [title, exercises, workoutId],
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
    getWorkout,
  };
};
