document.addEventListener("DOMContentLoaded", () => {
    const socket = io.connect();

    const screen = document.querySelector("#screen");
    const context = screen.getContext("2d");

    screen.width = 700;
    screen.height = 500;

    const pencil = {
        pos: {
            x: 0,
            y: 0,
        },
        beforePos: null,
        active: false,
        moviment: false,
    };

    const drawLine = (line) => {
        try {
            context.beginPath();
            context.moveTo(line.beforePos.x, line.beforePos.y);
            context.lineTo(line.pos.x, line.pos.y);
            context.stroke();
        } catch {
            context.clearRect(0, 0, screen.width, screen.height);
        }
    };

    screen.onmousedown = (event) => {
        pencil.active = true;
    };

    screen.onmouseup = (event) => {
        pencil.active = false;
    };

    screen.onmousemove = (event) => {
        pencil.pos.x = event.clientX;
        pencil.pos.y = event.clientY;
        pencil.moviment = true;
    };

    socket.on("draw", (line) => {
        drawLine(line);
    });

    document.addEventListener("keyup", (event) => {
        if (event.code == "Space") {
            socket.emit("clean");
        }
    });

    const cicle = () => {
        if (pencil.active && pencil.moviment && pencil.beforePos) {
            let line = {
                pos: pencil.pos,
                beforePos: pencil.beforePos,
            };
            socket.emit("draw", line);

            pencil.moviment = false;
        }
        pencil.beforePos = { ...pencil.pos };

        setTimeout(cicle, 10);
    };
    cicle();
});
