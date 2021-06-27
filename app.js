const express = require("express");
const path = require("path");
const http = require("http");
const port = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Socket IO server listening at port %d", port);
});

app.get("/", function (req, res) {
  res.send("hello world");
});

const socket = require("socket.io"); //匯入socket
const io = socket(server); //socket監聽server

//當新的client建立連線
io.on("connection", function (socket) {

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", function (data) {
    console.log(data);
    // 傳送資料到所有client
    io.to("room_channel_1").emit("newMessage", data);
  });
});
