DROP TABLE IF EXISTS group_members CASCADE;
CREATE TABLE group_members(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  avatar_url VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'
);