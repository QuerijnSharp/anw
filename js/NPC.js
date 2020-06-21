import { Entity } from "./Entity.js";
import { Game } from "./Game.js";

export class NPC extends Entity {
    interacting = false;
    currentDialogue = 0;

    constructor(x, y, spriteSheet) {
        super(x, y, spriteSheet)
    }

    getDialogue() {

    }

    interact(player, map) {
        switch (player.direction) {
            case Game.UP:
                this.direction = Game.DOWN;
                break;
            case Game.DOWN:
                this.direction = Game.UP;
                break;
            case Game.LEFT:
                this.direction = Game.RIGHT;
                break;
            case Game.RIGHT:
                this.direction = Game.LEFT;
                break;
        }
    }

    draw(ctx, map) {
        super.draw(ctx, map);
        if (this.interacting) {
            ctx.save();
            ctx.fillStyle = '#F8F8F8';
            ctx.fillRect(map.fov.x + map.canvasWidth / 4,map.fov.y + 20, map.canvasWidth / 2, 100);
            
            ctx.lineWidth = 4;
            ctx.strokeStyle  = '#706880';
            ctx.strokeRect(map.fov.x +map.canvasWidth / 4, map.fov.y +20, map.canvasWidth / 2, 100);

            ctx.lineWidth = 2;
            ctx.strokeStyle  = '#8888C8';
            ctx.strokeRect(map.fov.x +map.canvasWidth / 4, map.fov.y +20, map.canvasWidth / 2, 100);

            ctx.lineWidth = 2;
            ctx.strokeStyle  = '#283030';
            ctx.strokeRect(map.fov.x + map.canvasWidth / 4, map.fov.y +20, map.canvasWidth / 2, 100);

            ctx.fillStyle = 'black';
            ctx.font = "15px Arial";
            ctx.textAlign = "left";
            var txt = this.getDialogue();
            var currentY = 40;
            for (var line of txt.split('\n')) {
                ctx.fillText(line, map.fov.x + map.canvasWidth / 4 + 10, map.fov.y + currentY);
                currentY += 20;
            }
            ctx.restore();
        }
    }
}