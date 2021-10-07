# FitHub

Since the beginning of the pandemic, it has been extremely difficult to keep up with personal fitness goals. This is especially true for any gym goers who miss the social element of going to the gym and needing the extra motivation. Instead of becoming a coach potato during these times, why not get in shape with some push-ups.

FitHub is a social fitness application that focuses on community. Having a strong emphasis on building and maintaining a community, users can create a group on FitHub to share their workouts and participate in other shared workout routines  posted in the group forum/feed. They can comment and also “like” the workout by adding a “flex”.

Workout builder is another main feature of Fithub. For this project we used [Exercise DB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/) to fuel Fithub with exercise information and GIFs that show specific exercise movements. When building an exercise, users can search by exercise name or pre-programmed search criterias such as legs, arms, abs, back and bodyweight. Users can also define the sets and reps for an exercise.

For user's that want to follow a workout, the user could click on the image of the workout and the first exercise will appear along with the number of reps and sets. Once the user has completed their first exercise, they can proceed with the next exercise GIF.

## Features

- Exercises can be built into a workout
- Friend system
- Exercise guidance page
- Search for a specific exercise
- Users can signup and login
- Users can publish a workout
- Users can view workouts published by other users
- Users can create a group with their friends

## Screenshots

![create new workout](./screenshots/create_workout.gif)
![like nad comment](./screenshots/like_and_comment.gif)
![friend request](./screenshots/friend_request.gif)

## Setup

Install dependencies with `npm install` in the `client` and `server` directory

Setting up databse schema's and seeds `npm run db:reset` in `server` directory

## Running Webpack Development Server

`npm start`

## Dependencies

- React
- Express
- jsonwebtoken (JWT)
- axios
- bcrupt
- classnames
- proptype
- cookie-parser
- cors
- pg
- pg-native
- margan
- nodemon
- dotenv

## Testing

- Storybook
- Jest
- Cypress

## Contributors

This project is made possible by:

- [Kyle Forsyth](https://github.com/cupokyle)
- [Juliet Li](https://github.com/Julietmtl)
- [William Ye](https://github.com/zeeplo)
