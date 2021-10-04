CREATE VIEW user_comments AS
SELECT comments.id,
  comments.user_id,
  users.first_name,
  users.last_name,
  users.avatar_url,
  comments.workout_id,
  workouts.title,
  workouts.user_id AS owner_id,
  comments.message
FROM comments
  JOIN workouts ON comments.workout_id = workouts.id
  JOIN users ON users.id = comments.user_id;