import { Map } from './Map.js';
import { NPC } from './NPC.js';
import { Stats } from './Utility/Stats.js';
import { loadImage } from '../loaders.js';


export class Game {
    static gridCellSize = 32;
    static UP = 0;
    static DOWN = 1;
    static LEFT = 2;
    static RIGHT = 3;
    static UNSET = 4;

    map;
    ctx;
    pressedKeys = [];
    oldKeys = [];
    stats;
    splashScreen = true;

    constructor() {
        this.map = new Map();
        this.stats = new Stats();
    }


    async start() {
        // setInterval(() => {
        //     this.update();
        // }, 1000 / this.fps);

        var _update = () => {
            this.update();

            requestAnimationFrame(_update);
        }

        _update();

        await this.map.init('a000');

    }

    async init(canvas, ctx, images) {
        this.canvas = canvas;
        this.map.canvasWidth = canvas.width;
        this.map.canvasHeight = canvas.height;
        this.ctx = ctx;
        await this.start();
    }

    update() {
        this.stats.begin();
        if (this.pressedKeys.some(s => s == 32 || s == 13)) {
            this.splashScreen = false;
        }
        if (!this.map.loading) {
            this.handleKeyPress();
            this.map.update();
        }
        else {
            this.pressedKeys = [];
        }
        this.draw();
        this.stats.end();
        this.ctx.textAlign = "left";

        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillText(`FPS: ${Math.ceil(this.stats.fps)} MS: ${Math.floor(this.stats.frameMS)}`, 10, 20);
    }

    handleKeyPress() {
        this.map.player.updateKey(this.map, this.pressedKeys, this.oldKeys.filter(i => !this.pressedKeys.includes(i)));
        this.oldKeys = this.pressedKeys;
    }

    draw() {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.splashScreen) {
            this.ctx.save();
            this.ctx.font = "24px 'Rock Salt'";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "#333333";
            this.ctx.fillText("Use WASD to move and press q to pickup an item and e to drop one. Made by Querijn, Puck, Joeri and Floor. ANW 2020", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillText("Press enter or space to interact with NPCs", this.canvas.width / 2, this.canvas.height / 2 + 29);
            this.ctx.fillText("Press enter or space to continue", this.canvas.width / 2, this.canvas.height / 2 + 58);
            this.ctx.restore();
        }
        else {
            //this.map.center(player);
            if (!this.map.loading) {
                this.map.center(this.canvas.width, this.canvas.height, this.ctx);
                this.map.draw(this.ctx);
            }
            else {
                this.ctx.save();
                this.ctx.font = "34px 'Rock Salt'";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = "#333333";
                this.ctx.fillText("Loading...", this.canvas.width / 2, this.canvas.height / 2);
                this.ctx.restore();
            }
        }
        this.ctx.restore();
    }

}