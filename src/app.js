const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);

const socketIo = require("socket.io");

const io = socketIo.listen(server);

server.listen(3000, () => {
    console.log("running");
});

app.use(express.static(__dirname + "/public"));

let history = [];

io.on("connection", (socket) => {
    history.forEach((line) => {
        socket.emit("draw", line);
    });

    socket.on("draw", (line) => {
        history.push(line);
        io.emit("draw", line);
    });

    socket.on("clean", () => {
        history = [];
        io.emit("draw");
    });
});
