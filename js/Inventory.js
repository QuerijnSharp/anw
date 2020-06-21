export class Inventory {
    slots = [];
    spaces;
    constructor(spaces) {
        this.spaces = spaces;
    }

    addItem(item) {
        var stack = this.slots.findIndex(s => s.id == item.id && s.stack < s.maxStack);
        if (stack >= 0) {
            this.slots[stack].stack++;
            return true;
        }
        else {
            if (this.slots.length < this.spaces) {
                this.slots.push(item);
                return true;
            }
        }
    }

    removeItem(id) {
        this.slots = this.slots.filter(s => s.id == id)
    }

    removeItem() {
        if (this.slots.length > 0) {
            return this.slots.shift();
        }
    }

    draw(ctx, spriteSheet, width, height) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //ctx.resetTransform();
        ctx.textAlign = "right";

        for (var i = 0; i < this.spaces; i++) {
            ctx.fillStyle = "#585758";
            ctx.fillRect(width - 41 - (i* 50), height - 41, //10 + (i * 50)
                40, 40); //41 is missing some shadows :/

            if (this.slots[i]) {
                var item = this.slots[i];
                
                ctx.drawImage(item.sprite, width - 41 - (i* 50) + 4,  height - 41 + 4)

                /*spriteSheet.draw(item.id, ctx, 10 + (i * 50) + item.offset[0],
                350 + item.offset[1]);*/

                if (item.stack > 1) {
                    ctx.font = "bold 10pt sans-serif";
                    ctx.fillStyle = "#000000";
                    ctx.fillText("" + item.stack,
                        10 + (i * 50) + 38,
                        350 + 38);
                }
            }
            ctx.save();
            ctx.lineWidth = 3;
            ctx.strokeStyle  = '#777375';
            ctx.strokeRect(width - 41 - (i* 50), height - 41, 40, 40);
            ctx.restore();
        }
        ctx.restore();
    }
}