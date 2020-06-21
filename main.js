import { Game } from './js/Game.js'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.game = new Game();

/** BINDINGS **/


document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (window.game.pressedKeys.every(s => s != event.which))
        window.game.pressedKeys.unshift(event.which);

    //window.game.handleKeyPress();
}, false);

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (window.game.pressedKeys.some(s => s == event.which))
        window.game.pressedKeys = window.game.pressedKeys.filter(s => s != event.which);

    //window.game.handleKeyPress();
}, false);


/** GAME START! **/

document.addEventListener("DOMContentLoaded", async () => {
    document.body.scrollTop = 0;
    canvas.width = window.innerWidth - window.innerWidth % Game.gridCellSize;
    canvas.height = window.innerHeight - window.innerHeight % Game.gridCellSize;
    await window.game.init(canvas, ctx, [
        "tiles",
        "n000",
        "n001",
        "n002",
        "n003",
        "n004",
        "n005",
        //"n006",
        "n007",
        "n008",
        "n009",
        "n010",
        "i000"
    ]);
});