
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


/*=================*/
/*== RUN PROJECT ==*/
/*=================*/

1) open two terminals (one for backend/frontend)
2) cd backend
3) nodemon app.js
4) cd ..
5) cd frontend
6) npm run dev
