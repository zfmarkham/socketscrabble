/**
 * Created by zmark_000 on 02/10/2016.
 */


Tile.TILE_SIZE = 50;

function Tile(position) {
    PIXI.Container.call(this);
    this.position = position;

    var gfx = new PIXI.Graphics();
    gfx.beginFill(0x0C776A, 1);
    gfx.lineStyle(2, 0x000000, 1);
    gfx.drawRect(0, 0, Tile.TILE_SIZE, Tile.TILE_SIZE);
    gfx.endFill();
    
    this.addChild(gfx);
}

//Tile.constructor = Tile;
Tile.prototype = Object.create(PIXI.Container.prototype);
Tile.prototype.constructor = Tile;