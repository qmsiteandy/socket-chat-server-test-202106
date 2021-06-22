const express = require("express");
const path = require("path");
const http = require("http");
const port = process.env.PORT || 5500;
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Socket IO server listening at port %d", port);
});

const io = socket(server);

app.get('/', function(req, res) {
  res.send('hello world');
});

io.on("connection", function (socket) {
  console.log("connection", socket.id);

  socket.on("sendMessage", function (data) {
    console.log(data);
    io.emit("newMessage", data);
  });
});
