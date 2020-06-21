import { Entity } from './Entity.js';
import { Game } from './Game.js';
import { Inventory } from './Inventory.js';

export class Player extends Entity {

    /**
     * @type Inventory
     */
    inventory;

    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.inventory = new Inventory(3);
    }

    update(map) {
        var oldX = this.x;
        var oldY = this.y;
        super.update(map);
        if (oldX != this.x || oldY != this.y) {
            map.npcs.forEach(s => {
                s.endInteraction();
            });
        }
    }

    updateKey(map, pressedKeys, newKeys) {
        var checkKey = pressedKeys[0];
        if (checkKey == 16)
            checkKey = pressedKeys[1];

        if (checkKey) {
            if (pressedKeys.some(s => s == 16)) { // Shift
                this.speedMultiplier = 2;
            } else {
                this.speedMultiplier = 1;
            }

            if (checkKey == 87 || checkKey == 38) { // W, Up Arrow
                if (!this.moving)
                    return this.startMoving(Game.UP, map);
            } else if (checkKey == 83 || checkKey == 40) { // S, Down Arrow
                if (!this.moving)
                    return this.startMoving(Game.DOWN, map);
            } else if (checkKey == 65 || checkKey == 37) { // A, Left Arrow
                if (!this.moving)
                    return this.startMoving(Game.LEFT, map);
            } else if (checkKey == 68 || checkKey == 39) { // D, Right Arrow
                if (!this.moving)
                    return this.startMoving(Game.RIGHT, map);
            } else {
            }
        };



        if (this.x % 32 == 0 && this.y % 32 == 0) {
            if (newKeys.some(s => s == 81)) { // Q
                if (map.items.some(s => s.x == this.x && s.y == this.y)) {
                    for (var item of map.items.filter(s => s.x == this.x && s.y == this.y)) {
                        this.inventory.addItem(item);
                        map.items = map.items.filter(s => s.x != this.x && s.y != this.y);
                    }
                }
            }

            if (newKeys.some(s => s == 69)) { // E
                if (this.inventory.slots.length >= 1 && !map.items.some(s => s.x == this.x && s.y == this.y)) {
                    map.items.push({
                        ...this.inventory.removeItem(), // Nice spread operator
                        'x': this.x,
                        'y': this.y,
                    });
                }
            }
        }



        if (newKeys.some(s => s == 13) || newKeys.some(s => s == 32)) { // Spacebar, Enter
            var npcX = this.x;
            var npcY = this.y;
            switch (this.direction) {
                case Game.UP:
                    npcY -= Game.gridCellSize
                    break;
                case Game.DOWN:
                    npcY += Game.gridCellSize
                    break;
                case Game.LEFT:
                    npcX -= Game.gridCellSize;
                    break;
                case Game.RIGHT:
                    npcX += Game.gridCellSize;
                    break;
            }

            var idx = map.npcs.findIndex(s => s.x == npcX && s.y == npcY)
            if (idx >= 0)
                map.npcs[idx].interact(this, map);
        }
    }

    draw(ctx, spriteSheet, map) {
        super.draw(ctx, map);
        this.inventory.draw(ctx, spriteSheet, map.canvasWidth, map.canvasHeight);
    }
}