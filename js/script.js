// Test isometric
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//region CONSTANTES
const ANGLE = 1 / (2 * Math.sqrt(0.75));
//endregion

//region VARIABLES
// souris
let mouseX = 0;
let mouseY = 0;

let dotX = 10;
let dotY = 10;

let directionX = 0;
let directionY = 0;
//endregion

//region FUNCTIONS
function worldToScreenX(x, y) {
    return x - y;
}

function worldToScreenY(x, y) {
    return (y + x) * ANGLE;
}
//endregion

setInterval(()=> {
    canvas.width = 1000;
    canvas.height = 1000;

    //region MOVE
    dotX += directionX;
    dotY += directionY;
    //endregion

    //region DRAW
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";

    // dots
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            let posX = x * 20;
            let posY = y * 20;
            let sposX = worldToScreenX(posX, posY);
            let sposY = worldToScreenY(posX, posY);
            sposX += 300;
            sposY += 300;
            ctx.fillRect(sposX - 5, sposY - 5, 10, 10);
        }
    }
    // dot
    ctx.fillStyle = "green";
    let sdotX = worldToScreenX(dotX, dotY);
    let sdotY = worldToScreenY(dotX, dotY);
    sdotX += 300;
    sdotY += 300;
    ctx.fillRect(sdotX - 5, sdotY - 5, 10, 10);
    //endregion
}, 0);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") {
        directionY = -1;
    }
    if (e.code === "KeyS") {
        directionY = 1;
    }
    if (e.code === "KeyA") {
        directionX = -1;
    }
    if (e.code === "KeyD") {
        directionX = 1;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "KeyW" || e.code === "KeyS") {
        directionY = 0;
    }
    if (e.code === "KeyA" || e.code === "KeyD") {
        directionX = 0;
    }
});