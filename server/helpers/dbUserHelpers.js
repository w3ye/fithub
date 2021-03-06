module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [firstName, lastName, email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUserById = (id) => {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const updateRefreshToken = (id, refreshToken) => {
    const query = {
      text: "UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *;",
      values: [refreshToken, id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateProfilePic = (url, id) => {
    const query = {
      text: "UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING *;",
      values: [url, id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    updateRefreshToken,
    getUserById,
    updateProfilePic,
  };
};
