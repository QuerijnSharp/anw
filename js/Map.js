import { loadJSON, loadImage } from '../loaders.js';
import { Player } from './Player.js';
import { Game } from './Game.js';
import { NPC } from './NPC.js';
import { n001 } from './NPCs/n001.js';
import { EntitySprite } from './SpriteSheet/EntitySprite.js';
import { Maps } from './Maps.js';
import { n009 } from './NPCs/n009.js';
import { n012 } from './NPCs/n012.js';
import { n016 } from './NPCs/n016.js';
import { n014 } from './NPCs/n014.js';
import { n007 } from './NPCs/n007.js';
import { n010 } from './NPCs/n010.js';
import { n003 } from './NPCs/n003.js';

export class Map {
    tiles = [];
    width;
    height;
    canvasHeight;
    canvasWidth;
    mapWidth;
    mapHeight;

    items = [];
    npcs = [];
    fov = {};
    collisions = {};
    loading = true;

    x;
    y;

    constructor() {

    }

    async init(mapName) {
        this.loading = true;
        var map = Maps[mapName];
        this.scale = map.scale;
        var mapJson = await loadJSON(`maps/${map.map}`);
        this.spriteSheet = await loadImage(`images/${map.tileMap}`);
        this.mapWidth = mapJson.width * Game.gridCellSize;
        this.mapHeight = mapJson.height * Game.gridCellSize;

        for (var layer of mapJson.layers) {
            switch (true) {
                case (layer.name === 'collisions'): // Collisions
                    this.initCollisions(layer);

                    break;
                case (layer.type === 'objectgroup'): // Objects
                    await this.initObjects(layer);

                    break;
                default: // Tile Layer
                    this.initTiles(layer);

                    break;
            }
        }
        this.loading = false;
    }

    initCollisions(collisions) {
        var width = collisions.width;

        for (var i = 0; i < collisions.data.length; i++) {
            var data = collisions.data[i];
            var y = (Math.ceil((i + 1) / width) - 1) * 32;
            var x = (i % width) * 32;
            var data = collisions.data[i];

            if (!this.collisions[y]) {
                this.collisions[y] = [];
            }

            this.collisions[y][x] = data;
        }
    }

    async initObjects(objects) {
        for (var i = 0; i < objects.objects.length; i++) {
            var object = objects.objects[i];

            switch (object.type) {
                case 'player':
                    var playerSprite = await loadImage(`images/${object.properties[0].value}.png`);
                    var player = new Player(object.x, object.y, new EntitySprite(playerSprite, { pattern: [1, 0, 2, 0], index: 0 }));
                    this.player = player;

                    break;
                case 'npc':
                    var npc = object.properties[0].value;
                    var npcSprite = await loadImage(`images/${npc}.png`);
                    if (npc == "n001") {
                        this.npcs.push(new n001(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n009") {
                        this.npcs.push(new n009(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n012") {
                        this.npcs.push(new n012(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n010") {
                        this.npcs.push(new n010(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n014") {
                        this.npcs.push(new n014(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n016") {
                        this.npcs.push(new n016(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n007") {
                        this.npcs.push(new n007(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    else if (npc == "n003") {
                        this.npcs.push(new n003(object.x, object.y, new EntitySprite(npcSprite, { pattern: [1, 0, 2, 0], index: 0 }), Game.DOWN));
                    }
                    break;

                    case 'item':
                        var itemSprite = await loadImage(`images/${object.properties[1].value}.png`);
                        this.items.push({
                            sprite: itemSprite,
                            x: object.x, 
                            y: object.y,
                            name: object.properties[1].value,
                            id: object.properties[0].value
                        });
                    break;
                default:

                    break;
            }
        }
    }

    initTiles(tiles) {
        var width = tiles.width;

        for (var i = 0; i < tiles.data.length; i++) {
            var tile = tiles.data[i];
            if (tile !== 0) {
                var y = (Math.ceil((i + 1) / width) - 1) * Game.gridCellSize;
                var x = (i % width) * Game.gridCellSize;

                if (!this.tiles[y])
                    this.tiles[y] = [];

                if (!this.tiles[y][x])
                    this.tiles[y][x] = [];

                this.tiles[y][x].push(tile);
            }
            //'style="background-position: -' + ((x * game.gridCellSize) - game.gridCellSize) + 'px -' + ((y * game.gridCellSize) - game.gridCellSize) + 'px; left: ' + (counter * game.gridCellSize) + 'px; top: ' + (row * game.gridCellSize) + 'px">' +
        }
    }

    center(width, height, ctx) {
        this.canvasWidth = width;
        this.canvasHeight = height;

        this.fov = {
            width: this.canvasWidth,
            height: this.canvasHeight
        };



        if (this.canvasWidth >= this.mapWidth || this.canvasHeight >= this.mapHeight) {
            if (this.canvasWidth >= this.mapWidth) {
                //Center X
                this.fov.x = -((this.canvasWidth - this.mapWidth) / 2);
            }
            else if (this.canvasHeight >= this.mapHeight) {
                //Center Y
                this.fov.y = (this.canvasHeight / 2) - (this.mapHeight / 2);
            }
        }

        if (this.fov.x == null && this.player.x - this.canvasWidth / 2 < 0) {
            this.fov.x = 0;
        }

        if (this.fov.y == null && this.player.y - this.canvasHeight / 2 < 0) {
            this.fov.y = 0;
        }

        if (this.fov.x == null && this.player.x + this.canvasWidth / 2 > this.mapWidth) {
            this.fov.x = this.mapWidth - this.canvasWidth;
        }

        if (this.fov.y == null && this.player.y + this.canvasHeight / 2 > this.mapHeight) {
            this.fov.y = this.mapHeight - this.canvasHeight;
        }

        if (this.fov.x == null) {
            this.fov.x = (this.player.x) - this.canvasWidth / 2;
        }

        if (this.fov.y == null) {
            this.fov.y = (this.player.y) - this.canvasHeight / 2;
        }

        // x = (windowWidth / 2) - (this.player.x + (game.activePlayer.width() / 2));
        // y = (windowHeight / 2) - (this.player.y + ((game.activePlayer.height() + 8) / 2));

        // if (this.width <= windowWidth && this.height <= windowHeight) {
        //     left = (windowWidth - this.width) / 2;
        //     top = (windowHeight - this.height) / 2;
        // }

        // if (this.width > windowWidth && /*this.self.offset().left > 0 &&*/ player.x < windowWidth
        //     && this.height > windowHeight && /*this.self.offset().top > 0 &&*/ player.y < windowHeight) {
        //     x = 0;
        //     y = 0;
        // }

        //ctx.translate(-(this.player.x) + width / 2, -(this.player.y) + height / 2);
        ctx.translate(-this.fov.x, -this.fov.y);
    }

    scrollStage(direction, player) {
        var playerOff = player;
        var offset = 0;
        var stageL = x;
        var stageT = y;
        var windowH = canvas.height;
        var windowW = canvas.width;

        if ((this.width > windowW || this.height > windowH)) {
            switch (direction) {
                case Game.Directions.up:
                    if ((playerOff.x + (Game.gridCellSize / 2)) < (windowH / 2) && stageT < 0) {
                        ctx.translate(stageL + offset, stageT + Game.gridCellSize + offset);

                    }
                    break;
                case Game.Directions.down:
                    if ((playerOff.top + (Game.gridCellSize / 2)) > (windowH / 2)
                        && Math.abs(stageT - windowH) < this.height) {
                        ctx.translate(stageL + offset, stageT - Game.gridCellSize + offset);
                    }
                    break;
                case Game.Directions.left:
                    if ((playerOff.left + (Game.gridCellSize / 2)) < (windowW / 2) && stageL < 0) {
                        ctx.translate(stageL + Game.gridCellSize + offset, stageT + offset);

                    }
                    break;
                case Game.Directions.right:
                    if ((playerOff.left + (Game.gridCellSize / 2)) > (windowW / 2)
                        && Math.abs(stageL - windowW) < this.width) {
                        ctx.translate(stageL - Game.gridCellSize + offset, stageT + offset);
                    }
                    break;
            }
        }
    }

    drawTiles() {

    }

    update() {
        if (this.loading) return;
        this.player.update(this);
        this.npcs.forEach(s => s.update(this));
    }

    draw(ctx) {
        var testY = this.fov.y - (this.fov.y % Game.gridCellSize);
        if (testY < 0)
            testY = 0;
        var testX = this.fov.x - (this.fov.x % Game.gridCellSize);
        if (testX < 0)
            testX = 0;

        var resultY = this.fov.y + this.fov.height + ((this.fov.y + this.fov.height) % Game.gridCellSize);
        var resultX = this.fov.x + this.fov.width + ((this.fov.x + this.fov.width) % Game.gridCellSize);

        if (resultY > this.mapHeight)
            resultY = this.mapHeight;

        if (resultX > this.mapWidth)
            resultX = this.mapWidth;

        for (var y = testY; y <= resultY; y += 32) {
            if (!this.tiles[y]) continue;
            for (var x = testX; x <= resultX; x += 32) {
                if (!this.tiles[y][x]) continue;
                var tilesToDraw = this.tiles[y][x];
                for (var tile of tilesToDraw) {

                    var tileY = Math.ceil(tile / (this.spriteSheet.width / Game.gridCellSize));
                    var tileX = (tile - ((tileY - 1) * (this.spriteSheet.width / Game.gridCellSize)));

                    ctx.drawImage(this.spriteSheet, ((tileX * Game.gridCellSize) - Game.gridCellSize), ((tileY * Game.gridCellSize) - Game.gridCellSize), Game.gridCellSize, Game.gridCellSize, x, y, Game.gridCellSize, Game.gridCellSize);
                }
            }
        }

        for (var item of this.items) {
            ctx.drawImage(item.sprite, item.x, item.y);
        }
        this.npcs.forEach(s => s.draw(ctx, this));
        this.player.draw(ctx, null, this);
    }

    canMove(x, y) {
        if (x <= 0|| x >= this.mapWidth)
        return false;
        if (y <= 0 || y >= this.mapHeight)
        return false;
        if (this.collisions[y] && this.collisions[y][x] != null && this.collisions[y][x] != 0)
            return false;
        if (this.npcs.some(s => s.x == x && s.y == y))
            return false;

        return true;
    }

    loadMap(map) {
        this.loading = true;
        this.tiles = [];
        this.items = [];
        this.player = null;
        this.npcs = [];
        this.collisions = {};
        this.mapHeight = -1;
        this.mapWidth = -1;
        this.init(map);
    }
}