import { Sprite } from '../Sprite.js';

export class ItemSprite extends Sprite {
    /**
     * @type Animation
     */
    animation;
    constructor(spriteSheet, animationData) {
        super(spriteSheet);
        this.animation = new Animation(6, animationData);
    }

    draw(ctx, item, x , y) {
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