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

const S_PLAYER_NE = new Image();
S_PLAYER_NE.src = "./images/PlayerNE.png";
const S_PLAYER_NW = new Image();
S_PLAYER_NW.src = "./images/PlayerNW.png";
const S_PLAYER_SE = new Image();
S_PLAYER_SE.src = "./images/PlayerSE.png";
const S_PLAYER_SW = new Image();
S_PLAYER_SW.src = "./images/PlayerSW.png";
//endregion

//region VARIABLES
// souris
let mouseX = 0;
let mouseY = 0;

let dotX = 500;
let dotY = 500;

let directionX = 0;
let directionY = 0;

let sprite = S_PLAYER_SE;
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
    let dirDistance = Math.sqrt(directionX ** 2 + directionY ** 2);
    if (dirDistance === 0) {
        dirDistance = 1;
    }
    dotX += directionX / dirDistance;
    dotY += directionY / dirDistance;
    //endregion

    //region DRAW
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";

    //ground
    for (let row = 0; row < 20; row++) {
        for (let column = 0 ; column <= row; column++) {
            let x = row - column;
            let y = row - x;
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
    ctx.drawImage(sprite, sdotX - 50, sdotY - 50 * 1.156, 100, 100 * 1.156);
    //endregion
}, 0);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") {
        directionY = -1;
        sprite = S_PLAYER_NE;
    }
    if (e.code === "KeyS") {
        directionY = 1;
        sprite = S_PLAYER_SW;
    }
    if (e.code === "KeyA") {
        directionX = -1;
        sprite = S_PLAYER_NW;
    }
    if (e.code === "KeyD") {
        directionX = 1;
        sprite = S_PLAYER_SE;
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