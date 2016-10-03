/**
 * Created by zmark_000 on 02/10/2016.
 */


Grid.GRID_ROWS      = 15;
Grid.GRID_COLUMNS   = 15;

Grid.prototype = Object.create(PIXI.Container.prototype);
Grid.prototype.constructor = Grid;

Grid.SPECIAL_TILES = [
    
];

function Grid()
{
    PIXI.Container.call(this);
    this.position.x = 50;
    this.position.y = 50;

    var gfx = new PIXI.Graphics();
    gfx.beginFill(0xCCCCCC, 1);
    gfx.lineStyle(20, 0xFFFFFF, 1);
    gfx.drawRect(0, 0, Grid.GRID_COLUMNS * Tile.TILE_SIZE, Grid.GRID_ROWS * Tile.TILE_SIZE);
    gfx.endFill();

    this.addChild(gfx);

    this.createTiles();
}

Grid.prototype.createTiles = function()
{
    for (var i = 0; i < Grid.GRID_ROWS; i++)
    {
        for (var j = 0; j < Grid.GRID_COLUMNS; j++)
        {
            var tile = new Tile({x: j * Tile.TILE_SIZE, y: i * Tile.TILE_SIZE});
            this.addChild(tile);
        }
    }
};