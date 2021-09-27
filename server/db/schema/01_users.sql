DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255)
);
CREATE TABLE groups(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL
);