DROP TABLE IF EXISTS friend_requests CASCADE;
CREATE TABLE friend_requests(
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) NOT NULL,
  reciever_id INTEGER REFERENCES users(id) NOT NULL,
  pending BOOLEAN DEFAULT true,
  message TEXT,
  created TIMESTAMP DEFAULT current_timestamp,
  sender_avatar VARCHAR(255)
);