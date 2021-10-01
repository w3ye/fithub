DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
  refresh_token VARCHAR(255)
);