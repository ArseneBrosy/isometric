// Test isometric
// by Arsène Brosy
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//region CONSTANTES
const ANGLE = 1 / (2 * Math.sqrt(0.75));
const CELLSIZE = 100;
//endregion

//region SPRITES
const S_GROUND = new Image();
S_GROUND.src = "./images/ground.png";
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

    //ground
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            let posX = x * CELLSIZE;
            let posY = y * CELLSIZE;
            let sposX = worldToScreenX(posX, posY);
            let sposY = worldToScreenY(posX, posY);
            sposX += canvas.width / 2;
            ctx.drawImage(S_GROUND, sposX - CELLSIZE, sposY - CELLSIZE * ANGLE, CELLSIZE * 2 + 2, CELLSIZE * ANGLE * 2 + 2);
        }
    }
    // dot
    let sdotX = worldToScreenX(dotX, dotY);
    let sdotY = worldToScreenY(dotX, dotY);
    sdotX += canvas.width / 2;
    ctx.fillRect(sdotX - 10, sdotY - 10, 20, 20);
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