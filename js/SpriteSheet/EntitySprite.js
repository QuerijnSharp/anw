import { Sprite } from '../Sprite.js';
import { Game } from '../Game.js';
import { Animation } from '../Animation.js';

export class EntitySprite extends Sprite {
    /**
     * @type Animation
     */
    animation;
    constructor(spriteSheet, animationData) {
        super(spriteSheet);
        this.animation = new Animation(6, animationData);
    }

    draw(ctx, direction, moving, x, y, scale) {
        if (scale) {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            if (moving) {
                this.animation.update();
                ctx.drawImage(this.spriteSheet, this.animation.getCurrentFrame() * Game.gridCellSize, direction * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                    x - 8, y - 16, Game.gridCellSize * 1.5, Game.gridCellSize * 1.5);
            }
            else {
                ctx.drawImage(this.spriteSheet, 0 * Game.gridCellSize, direction * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                    x - 8, y - 16, Game.gridCellSize * 1.5, Game.gridCellSize * 1.5);
            }
            ctx.restore();
        }
        else {
            if (moving) {
                this.animation.update();
                ctx.drawImage(this.spriteSheet, this.animation.getCurrentFrame() * Game.gridCellSize, direction * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                    x, y, Game.gridCellSize, Game.gridCellSize);
            }
            else {
                ctx.drawImage(this.spriteSheet, 0 * Game.gridCellSize, direction * Game.gridCellSize, Game.gridCellSize, Game.gridCellSize,
                    x, y, Game.gridCellSize, Game.gridCellSize);
            }
        }
    }
}