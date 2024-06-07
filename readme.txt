/*=================*/
/*== DICE SOCIAL ==*/
/*=================*/

//Description
diceSocial is an interactive web application where users can roll dice against each other and engage in real-time chat. The website leverages a database to store and retrieve user data, game results, and chat logs, ensuring a seamless and engaging user experience.

//Features
- **Real-time Chat**: Engage with other users instantly using the integrated live chat powered by WebSockets.
- **Dice Game**: Roll dice and compete against other users.
- **User Data Storage**: Securely store user data, game results, and chat logs in a database.

//Prerequisites
- Node.js
- npm

/*=================*/
/*== RUN PROJECT ==*/
/*=================*/

1) Download project
2) open terminal (Git Bash) in project root folder (dice-social)
4) cd backend
5) npm install
6) cd ..
7) cd frontend
8) npm install
9) cd ..
10) open two terminals (one for backend/frontend)
11) cd backend
12) nodemon app.js
13) cd ..
14) cd frontend
15) npm run dev
16) visit http://localhost:3001/ in your browser


/*===========================================*/
/*== SET UP A WEBSOCKET FOR A NEXT PROJECT ==*/
/*===========================================*/

Instructions

1) mkdir my-project
2) cd my-project
3) mkdir backend
4) cd backend
5) touch app.js
6) npm init
7) npm install cors@ socket.io@ express@ http-proxy-middleware@
8) cd ..
9) npx create-next-app (from my-project folder)
10) name the next project frontend
11) cd frontend
12) npm install socket.io-client@
13) cd ..
14) code . (from my-project folder)
15) Clean up the project by manually removing all redundant next-related files and code
16) add the below in the .eslintrc.json to avoid babel warnings in console

{
  "extends": [
    "next/babel",
    "next/core-web-vitals"
  ]
}

