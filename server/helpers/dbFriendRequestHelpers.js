module.exports = (db) => {
  const getRequestsById = (id) => {
    const query = {
      text: `SELECT
      friend_requests.id,
      sender_id,
      reciever_id,
      message,
      created,
      users.first_name AS sender_first_name,
      users.last_name AS sender_last_name
      FROM friend_requests
      JOIN users ON sender_id = users.id
      WHERE reciever_id = $1 AND pending;`,
      values: [id],
    };
    return db
      .query(query)
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

  const acceptRequest = (id) => {
    const query = {
      text: `UPDATE friend_requests
      SET pending = false
      WHERE id = $1
      RETURNING *`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getRequestsById,
    newRequest,
    acceptRequest,
  };
};
