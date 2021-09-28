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

  const getFriendsByUserId = (userId) => {
    const query = {
      text: `
        SELECT 
        friends.id, 
        friends.friend_id, 
        users.first_name AS friend_first_name, 
        users.last_name AS friend_last_name,
        users.email AS friend_email
        FROM users
        JOIN friends ON friends.friend_id = users.id
        WHERE friends.user_id = $1;
      `,
      values: [userId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getFriends,
    getFriendsByUserId,
  };
};
