document.addEventListener("DOMContentLoaded", () => {
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
        context.beginPath();
        context.moveTo(line.beforePos.x, line.beforePos.y);
        context.lineTo(line.pos.x, line.pos.y);
        context.stroke();
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

    const cicle = () => {
        if (pencil.active && pencil.moviment && pencil.beforePos) {
            drawLine({ pos: pencil.pos, beforePos: pencil.beforePos });
            pencil.moviment = false;
        }
        pencil.beforePos = { ...pencil.pos };

        setTimeout(cicle, 10);
    };
    cicle();
});
