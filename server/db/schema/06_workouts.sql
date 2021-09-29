DROP TABLE IF EXISTS workouts CASCADE;
CREATE TABLE workouts(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  group_id integer [],
  exercise jsonb
);