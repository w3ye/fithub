DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE groups(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL
);