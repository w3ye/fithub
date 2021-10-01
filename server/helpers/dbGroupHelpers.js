const group = require("../routes/group");

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

  const newGroup = (userId, title) => {
    const query = {
      text: `
        INSERT INTO groups (owner_id, title)
        VALUES ($1, $2)
        RETURNING *;
      `,
      values: [userId, title],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserGroups = (id) => {
    const query = {
      text: `
        SELECT 
        group_members.id, 
        group_id, 
        title
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

  const getGroupMembers = (groupId, userId) => {
    // gets all the members of a group, current user excluded
    const query = {
      text: `
        SELECT * 
        FROM group_members_view
        WHERE group_id = $1 AND user_id <> $2
      `,
      values: [groupId, userId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUserToGroup = (groupId, userId) => {
    const query = {
      text: `
        INSERT INTO group_members (group_id, user_id)
        VALUES ($1, $2)
        RETURNING *;`,
      values: [groupId, userId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  /**
   * Avoid duplicate records of user in the same group multiple times
   * @param {*} groupId
   * @param {*} userId
   * @returns {Promise<boolean>} false if the user doesn't exist in group
   */
  const checkUserInGroup = (groupId, userId) => {
    const query = {
      text: `
        SELECT * 
        FROM group_members
        WHERE group_id = $1 AND user_id = $2`,
      values: [groupId, userId],
    };
    return db
      .query(query)
      .then((result) => {
        return result.rows.length === 0 ? false : true;
      })
      .catch((err) => err);
  };

  return {
    getGroups,
    getUserGroups,
    addUserToGroup,
    checkUserInGroup,
    newGroup,
    getGroupMembers,
  };
};
