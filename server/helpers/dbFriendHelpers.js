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
        users.email AS friend_email,
        users.avatar_url AS friend_avatar
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

  const addFriends = (sender, reciever) => {
    const query = {
      text: `INSERT INTO friends (user_id, friend_id) VALUES($1, $2) RETURNING *`,
      values: [sender, reciever],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getFriends,
    getFriendsByUserId,
    addFriends,
  };
};
