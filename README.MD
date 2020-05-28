# Gartic Clone

## Install
#### Clone This repository with: git clone https://github.com/NicolasLopes7/gartic-clone.git. After this run "yarn" to install depedencies and yarn start to see the project at localhost.

## How it works
## Canvas Manipulation
#### To manipulate the canvas i'm using the DOMContentLoaded event, inside this have a pencil obj, a method to drawLine, the instance and context from canvas and the connection with sockets. If you can see click in this link: [script.js](./src/public/script.js)

## Connection with socket.io
### We have basically three messages:
```js
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
```
### At connection, i load the history
### At the draw i emit to all a line
### At clean, i clean the history and draw nothing
