/**
 * Created by zmark_000 on 04/10/2016.
 */

Rack.prototype = Object.create(PIXI.Container.prototype);
Rack.prototype.constructor = Rack;

function Rack()
{
    PIXI.Container.call(this);

    this.position.set(150, (Grid.GRID_COLUMNS * GridSquare.SIZE) + 30);

    // Basic low level drawing, this would probably end up being an image, if not then make consts for values
    let rackGfx = new PIXI.Graphics();
    rackGfx.beginFill(0x06413D, 1);
    rackGfx.drawRoundedRect(0, 0, 9 * GridSquare.SIZE, GridSquare.SIZE * 1.5, 10);
    rackGfx.drawRect(0, 10, 9 * GridSquare.SIZE, GridSquare.SIZE * 1.5 - 10);
    rackGfx.endFill();
    rackGfx.beginFill(0x08564E, 1);
    rackGfx.drawRoundedRect(0, 10, 20, GridSquare.SIZE, 6);
    rackGfx.drawRect(0, 20, 20, GridSquare.SIZE * 1.5 - 20);
    rackGfx.drawRoundedRect(9 * GridSquare.SIZE - 20, 10, 20, GridSquare.SIZE, 6);
    rackGfx.drawRect(9 * GridSquare.SIZE - 20, 20, 20, GridSquare.SIZE * 1.5 - 20);
    rackGfx.drawRect(0, GridSquare.SIZE * 1.5 - 30, 9 * GridSquare.SIZE, 30);
    rackGfx.endFill();

    this.addChild(rackGfx);
    this.tiles = [];

    this.bag = new Bag();
    this.addLetters(this.bag.getLetters(7));
}

Rack.prototype.addLetters = function(letters)
{
    let pos = {x: 35, y: -5};

    while (letters.length)
    {
        let char = letters.shift().toUpperCase();
        let tile = new Tile(char);
        tile.position.set(pos.x, pos.y);
        pos.x += GridSquare.SIZE + 5;
        this.addChild(tile);
        this.tiles.push(tile);
    }
};

Rack.prototype.getCurrentTile = function()
{
    return this.tiles.filter(tile=>tile.dragging)[0];
};
