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

  return {
    getWorkouts,
    newWorkout,
    getWorkoutsByUserId,
  };
};
