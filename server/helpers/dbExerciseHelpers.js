module.exports = (db) => {
  const getExercises = () => {
    const query = {
      text: "SELECT * FROM exercises;",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const findExercisesByName = (name) => {
    const query = {
      text: `
        SELECT * 
        FROM exercises
        WHERE info ->> 'name' like $1;
      `,
      values: [`%${name}%`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getExercises,
    findExercisesByName,
  };
};
