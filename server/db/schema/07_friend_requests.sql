DROP TABLE IF EXISTS friend_requests CASCADE;
CREATE TABLE friend_requests(
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id),
  reciever_id INTEGER REFERENCES users(id),
  pending BOOLEAN DEFAULT true,
  message TEXT,
  created TIMESTAMP DEFAULT current_timestamp
);