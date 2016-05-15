# The Legend of Tilde
## (front-end app)

This is a rewrite of the [front end app](https://www.github.com/skuttleman/capstone-server) for my final project at Galvanize. It was originally written using Angular, and before extending functionality I decided to rewrite with react/redux/react-router to familiarize myself with another front-end framework.

This is a 2 player cooperative puzzle game. Players must communicate what they see and what they need from the other player through rudimentary symbols in order to solve the puzzles. It uses socket.io for game update notification when the player is online, or the Twilio API for SMS notification when the player is offline.

View the deployed app at [legendoftilde.com](https://legendoftilde.com)

Get to dev-ing:

1. `npm install && npm run dev`

Run local server:

1. `npm start`
