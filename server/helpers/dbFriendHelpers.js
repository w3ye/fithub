module.exports = (db) => {
  const getFriends = () => {
    const query = {
      text: "SELECT * FROM friends",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getFriends,
  };
};
