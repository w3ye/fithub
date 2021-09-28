module.exports = (db) => {
  const getGroups = () => {
    const query = {
      text: "SELECT * FROM groups",
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getGroups,
  };
};
