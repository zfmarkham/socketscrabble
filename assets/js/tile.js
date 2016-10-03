/**
 * Created by zmark_000 on 02/10/2016.
 */


Tile.TILE_SIZE = 50;

Tile.COLOURS = {
    MIDDLE:         0xF79D8D,
    DOUBLE_LETTER:  0x72B7E4,
    DOUBLE_WORD:    0xF69888,
    TRIPLE_LETTER:  0x2384C5,
    TRIPLE_WORD:    0xED3237
};

function Tile(position, type)
{
    PIXI.Container.call(this);
    this.position = position;

    var gfx = new PIXI.Graphics();
    gfx.beginFill(0x0C776A, 1);
    gfx.lineStyle(2, 0x000000, 1);
    gfx.drawRect(0, 0, Tile.TILE_SIZE, Tile.TILE_SIZE);
    gfx.endFill();

    gfx.interactive = true;
    gfx.hitArea = new PIXI.Rectangle(0, 0, Tile.TILE_SIZE, Tile.TILE_SIZE);

    gfx.mouseover = function(mouseData)
    {
        var highlight = new PIXI.Graphics();
        highlight.beginFill(0xFFFFFF, 0.4);
        highlight.drawRect(0, 0, Tile.TILE_SIZE, Tile.TILE_SIZE);
        highlight.endFill();
        this.addChild(highlight);
    }.bind(this);

    gfx.mouseout = function(mouseData)
    {
        if (this.children.length > 1)
        {
            this.removeChildAt(1);
        }
    }.bind(this);
    
    this.addChild(gfx);
}

//Tile.constructor = Tile;
Tile.prototype = Object.create(PIXI.Container.prototype);
Tile.prototype.constructor = Tile;