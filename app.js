const express = require("express");
const path = require("path");
const http = require("http");
const port = process.env.PORT || 5500;

//匯入socket
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Socket IO server listening at port %d", port);
});

//socket監聽server
const io = socket(server);

app.get('/', function(req, res) {
  res.send('hello world');
});

//當新的client建立連線
io.on("connection", function (socket) {

  // 接收client傳來的資料
  socket.on("sendMessage", function (data) {
    console.log(data);
    // 傳送資料到所有client
    io.emit("newMessage", data);
  });
});
