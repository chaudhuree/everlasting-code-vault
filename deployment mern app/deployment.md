## backend deployment

- add one script in backend

```json
"scripts":{
  "startDev":"nodemon server.js",
  "build":"npm install"
}
```

- then go to render website
- login with github
- NEW -> web service
- connect the proper repo

- then fill below details

```
name: project name (bookselling backend)
root directory: if the files are in different folder then the main then give the path. suppose the files are in backend folder then mention this(backend)
runtime: NODE
build command: npm run build
start command: npm run startDev

```

- then click on the advance button to add env variables
- click the add select file
- give name .env
- paste all the env variables in the file

## deploy

# for vercel

- create a vercel.json file in the root directory

```json
{
  "version": 2,
  "name": "bookselling-backend",
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
}
```
- server.js is the file that is the entry point of the backend. if any project runs with app.js then replace it with app.js

- then package.json file is as usual like render and go to vercel website and deploy the project