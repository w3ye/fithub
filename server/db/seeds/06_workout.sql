INSERT INTO workouts (title, user_id, exercises)
VALUES (
    'Beach body',
    3,
    ARRAY [ 
    '{ "bodyPart": "back",
    "equipment": "cable",
    "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
    "id": "0007",
    "name": "alternate lateral pulldown",
    "target": "lats" }' ]::jsonb []
  ),
  (
    'Jump training',
    1,
    ARRAY ['
  {
    "bodyPart": "upper legs",
    "equipment": "band",
    "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0987.gif",
    "id": "0987",
    "name": "band one arm single leg split squat",
    "target": "quads",
    "set": "1",
    "reps": "10"
  }',
  '{
    "bodyPart": "upper legs",
    "equipment": "band",
    "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/1001.gif",
    "id": "1001",
    "name": "band single leg split squat",
    "target": "quads",
     "set": "1",
    "reps": "10"
  }',
  '{
    "bodyPart": "upper legs",
    "equipment": "band",
    "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/1004.gif",
    "id": "1004",
    "name": "band squat",
    "target": "glutes", 
    "set": "1",
    "reps": "10"
  }']::jsonb []
  )