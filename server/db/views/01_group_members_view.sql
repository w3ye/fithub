CREATE VIEW group_members_view AS
SELECT group_members.id,
  group_members.user_id,
  group_members.group_id,
  users.first_name,
  users.last_name,
  users.email,
  groups.title
FROM group_members
  JOIN users ON users.id = group_members.user_id
  JOIN groups ON groups.id = group_members.group_id;