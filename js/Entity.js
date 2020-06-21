import { Game } from "./Game.js";

export class Entity {
    x;
    y;
    speed;
    direction;
    moving;
    speedMultiplier;
    currentSpeedMultiplier;
    animationData = { pattern: [1, 0, 2, 0], index: 0 };

    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.moving = false;
        this.direction = Game.DOWN;
        //this.movetype = movetype;
        this.animcycle = 6;
        this.frame = 0;
        this.sprite = sprite;
        this.speedMultiplier = 1;
        this.currentSpeedMultiplier = this.speedMultiplier;
    }

    update(map) {
        if (this.moving) {
            if (this.x % Game.gridCellSize != 0 || this.y % Game.gridCellSize != 0) {
                this.move(this.direction, map);
            }
            else {
                this.moving = false;
            }
        }

        if (this.x % Game.gridCellSize == 0 && this.y % Game.gridCellSize == 0) {
            this.currentSpeedMultiplier = this.speedMultiplier;
        }
    }

    draw(ctx, map) {
        this.frame += 1;

        this.sprite.draw(ctx, this.direction, this.moving, this.x, this.y, map.scale);
        //TODO add Animation class
        /*if (this.moving) {
            switch (this.direction) {
                case Game.UP:

                    ctx.drawImage(this.spriteSheet, this.animationData.pattern[this.animationData.index] * Game.gridCellSize, 0 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
                case Game.DOWN:
                    ctx.drawImage(this.spriteSheet, this.animationData.pattern[this.animationData.index] * Game.gridCellSize, 1 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
                case Game.LEFT:

                    ctx.drawImage(this.spriteSheet, this.animationData.pattern[this.animationData.index] * Game.gridCellSize, 2 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
                case Game.RIGHT:

                    ctx.drawImage(this.spriteSheet, this.animationData.pattern[this.animationData.index] * Game.gridCellSize, 3 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
            }
            if (this.frame % this.animcycle == 0) {
                this.animationData.index++;
                if (this.animationData.index >= this.animationData.pattern.length)
                    this.animationData.index = 0;
            }
        }
        else {
            switch (this.direction) {
                case Game.UP:
                    ctx.drawImage(this.spriteSheet, 0 * Game.gridCellSize, 0 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
                case Game.DOWN:
                    ctx.drawImage(this.spriteSheet, 0 * Game.gridCellSize, 1 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
                case Game.LEFT:
                    ctx.drawImage(this.spriteSheet, 0 * Game.gridCellSize, 2 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
                case Game.RIGHT:
                    ctx.drawImage(this.spriteSheet, 0 * Game.gridCellSize, 3 * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                        this.x, this.y, Game.gridCellSize, Game.gridCellSize);
                    break;
            }
        }*/
    }

    move(direction, map) {
        this.direction = direction;
        if (direction == Game.LEFT) {
            if (map.canMove(this.x - Game.gridCellSize, this.y)) {
                this.x -= (this.speed * this.currentSpeedMultiplier);
            }
            else {
                return false;
            }
        }
        else if (direction == Game.RIGHT) {
            if (map.canMove(this.x + Game.gridCellSize, this.y)) {
                this.x += (this.speed * this.currentSpeedMultiplier);
            }
            else {
                return false;
            }
        }
        else if (direction == Game.UP) {
            if (map.canMove(this.x, this.y - Game.gridCellSize)) {
                this.y -= (this.speed * this.currentSpeedMultiplier);
            }
            else {
                return false;
            }
        }
        else if (direction == Game.DOWN) {
            if (map.canMove(this.x, this.y + Game.gridCellSize)) {
                this.y += (this.speed * this.currentSpeedMultiplier);
            }
            else {
                return false;
            }
        }
        return true;
    }

    startMoving(direction, map) {
        if (this.move(direction, map) && !this.moving) {
            this.direction = direction;
            this.moving = true;
            return true;
        }
        else {
            return false;
        }
    }
}