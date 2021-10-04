CREATE VIEW user_likes AS
SELECT likes.*,
  users.first_name,
  users.last_name,
  workouts.title,
  workouts.user_id AS owner_id
FROM likes
  JOIN workouts ON workouts.id = likes.workout_id
  JOIN users ON users.id = likes.user_id;