module.exports = (db) => {
  const getRequestsById = (id) => {
    const query = {
      text: "SELECT * FROM friend_requests WHERE reciever_id = $1 AND pending",
    };
    return db
      .query(query, [id])
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const newRequest = (request) => {
    const { sender_id, reciever_id, message } = request;
    const query = {
      text: `
        INSERT INTO friend_requests (sender_id, reciever_id, message )
        VALUES
        ($1, $2, $3)
        RETURNING *;
      `,
      values: [sender_id, reciever_id, message],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getRequestsById,
    newRequest,
  };
};
