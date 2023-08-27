## connection establishment

> server 
> install socket.io

```js
// server is the backend here. we can pass port here as well
// server is 8080 here
// cors is for allowing the frontend to connect to the backend
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
```
> client
> install socket.io-client


```js
// io er instance a server er url ta pass korte hobe
import { io } from 'socket.io-client'
const socket = io('http://localhost:8080');
socket.on('connect', () => {
  console.log("Connected to server with id: " + socket.id)
})

socket.on('connect', () => {
  console.log("Connected to server with id: " + socket.id)
})
```

## data sending from client to server 
> sending data from font end to backend -> emit

```js
// client
socket.emit('message', 'hello world');
socket.emit('client-data', 'a', 1, { a: 2, c: 3 })
```


> receiving data from backend to frontend -> on

```js
// server
io.on('connection', (socket) => {
  console.log("Connected to client with id: " + socket.id)
  socket.on('message', (data) => {
    console.log(data)
  })
  socket.on('client-data', (letter, number, object) => {
    console.log(letter, number, object)
  })
})
```
***
## data sending from server to client
> sending data from backend to frontend -> emit
  
  ```js
  // it broadcasts to all the clients connected to the server at port 8080
  // event the sender will receive the message that he sent
  // server
  io.on('connection', (socket) => {
    io.emit('message', 'hello world');
    
  })

```
*if we want to send message to all except the sender then*

```js
  io.on('connection', (socket) => {
    socket.broadcast.emit('message', 'hello world');
    
  })
```

> receiving data from backend to frontend -> on

```js
socket.on('message', (data) => {
  console.log(data)
})
``` 

***

## data sending to specific client

> sending data to a specific client need the client id
> so when a client connects to the server or open the client sided page
> with the socket.id a specific id is created so now if from one client we want to send data to another client we can just send the data and id to the server and the server will send the data to the specific client

> client

```js
socket.emit("send-message", message,clientId)
socket.on("received-message", (message) => {
  console.log(message);
});
```

> server

```js
socket.on("send-message", (message, clientId) => {
  socket.to(clientId).emit("received-message", message);
});
```

#### that means first from the client side send-message is emitted with the message and the client id to the server and then the server will listen with on and then send the message to the specific client with the client id using to and emit. finnaly as at the client side it also listen to the received-message event so it will receive the message if it's the client id matches with the client id that was sent from the server.

***

## send message to a group or to multiple selected user

> in this case we need to join a room
> so from the client side we need to emit a join event with the room name and  the server and then the server will join the client to the room and then the server will emit a message to the room and then the client will listen to the message event and then receive the message who are in the room

###### assume that in our ui we have a field for room name and a button to join the room and a field to send message to the room. that means after joining to a room when a user send a message then for the specific emit event the server will send the message to the room and then all the user in the room will receive the message

> client

- joining room event emit from client side

```js
let roomName = "ourgroup";
socket.emit("join-room", roomName);
```

- receiving join event from server side and joined the user to the room

```js
io.on("connection", (socket) => {
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
  });
});
```

##### now from different user when they use the same room name to join and send a request to the backend then for all individual user they will joined to the same group by the server. now then if from the client side if anyone send a message to the room mentioning the room name then all the user in the room will receive the message.

- sending message to the room

> client side

```js
socket.emit("send-message-to-ourgroup", message);
```

> server side

```js
io.on("connection", (socket) => {
  socket.on("send-message-to-ourgroup", (message) => {
    socket.to("ourgroup").emit("received-message", message);
  });
});
```

- receiving message from the server
> client side

```js
socket.on("received-message", (message) => {
  console.log(message);
});
```

***

### difference between socket.in and socket.to

- socket.in will send the message to all the user in the room including the sender
- socket.to will send the message to all the user in the room except the sender

***

## socket with callback

> it can be used to sent the sender that message has been received by the server

> client side

```js
let message= "hi i am sending message to you from client side"
socket.emit("send-message", message, (message) => {
  console.log(message);
});
// so after the server get the event and listen it then it will call the callback with a message and then the client will receive the message and then log it
```

> server side

```js
io.on("connection", (socket) => {
  socket.on("send-message", (message, callback) => {
    callback("message received");
  });
});
```

> ###### must remember that the callback function must be the last argument of the emit function