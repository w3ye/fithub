module.exports = (db) => {
  const getRequestsById = (id) => {
    const query = {
      text: "SELECT * FROM friend_requests WHERE reciever_id = $1",
    };
    return db
      .query(query, [id])
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getRequestsById,
  };
};
