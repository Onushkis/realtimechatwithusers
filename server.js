const path = require("path");
const http = require("http");
const express = require("express");
const formatMessage = require("./utils/messages");
const socketio = require("socket.io");
const { userJoin, getCurrrentUser } = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
const botName = 'ChatCord Bot';

// Run when client conects
io.on('connection', socket => {
socket.on('joinRoom', ({username, room }) => {
const user = userJoin ( socket.id, username, room );
socket.join(user.room);

  //Welcome current user
  socket.emit(
    'message', 
    formatMessage(botName, 'Welcme to ChatCord'));
  
  // Broadcast when a user connects
  socket.broadcast
  .to(user.room)
  .emit('message', 
   formatMessage(botName,`${user.username} has joined the chat`));
});

// Listen for chatMessage

socket.on('chatMessage', (msg) => {
  io.to(user.room).emit("message", formatMessage(user.username, msg));
});

//Runs the client disconnects

socket.on('disconnect', () => {
  io.emit(
    'message', 
    formatMessage('USER', 'A user has left the chat'));
});
});
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));




