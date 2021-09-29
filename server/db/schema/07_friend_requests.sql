DROP TABLE IF EXISTS friend_requests CASCADE;
CREATE TABLE friend_requests(
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  reciever_email VARCHAR(255) NOT NULL,
  is_resolved BOOLEAN,
  sent_at TIMESTAMP
);