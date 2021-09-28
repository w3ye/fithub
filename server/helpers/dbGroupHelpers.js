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

  const getUserGroups = (id) => {
    const query = {
      text: `
        SELECT group_members.id, user_id, group_id, title
        FROM group_members  
        JOIN users ON group_members.user_id = users.id 
        JOIN groups ON group_members.group_id = groups.id 
        WHERE users.id = $1;
      `,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getGroups,
    getUserGroups,
  };
};
