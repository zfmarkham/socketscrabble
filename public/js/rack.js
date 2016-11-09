/**
 * Created by zmark_000 on 04/10/2016.
 */

Rack.prototype = Object.create(PIXI.Container.prototype);
Rack.prototype.constructor = Rack;

Rack.MAX_TILES = 7;

function Rack()
{
    PIXI.Container.call(this);

    this.position.set(150, (Grid.GRID_COLUMNS * GridSquare.SIZE) + 30);

    // Basic low level drawing, this would probably end up being an image, if not then make consts for values
    let rackGfx = new PIXI.Graphics();
    rackGfx.beginFill(0x06413D, 1);
    rackGfx.drawRoundedRect(0, 0, (Rack.MAX_TILES + 2) * GridSquare.SIZE, GridSquare.SIZE * 1.5, 10);
    rackGfx.drawRect(0, 10, (Rack.MAX_TILES + 2) * GridSquare.SIZE, GridSquare.SIZE * 1.5 - 10);
    rackGfx.endFill();
    rackGfx.beginFill(0x08564E, 1);
    rackGfx.drawRoundedRect(0, 10, 20, GridSquare.SIZE, 6);
    rackGfx.drawRect(0, 20, 20, GridSquare.SIZE * 1.5 - 20);
    rackGfx.drawRoundedRect((Rack.MAX_TILES + 2) * GridSquare.SIZE - 20, 10, 20, GridSquare.SIZE, 6);
    rackGfx.drawRect((Rack.MAX_TILES + 2) * GridSquare.SIZE - 20, 20, 20, GridSquare.SIZE * 1.5 - 20);
    rackGfx.drawRect(0, GridSquare.SIZE * 1.5 - 30, (Rack.MAX_TILES + 2) * GridSquare.SIZE, 30);
    rackGfx.endFill();

    this.addChild(rackGfx);

    this.placeHolders = [];
    this.tiles = [];

    this.createTilePlaceholders();

    this.bag = new Bag();

    this.addLetters(this.bag.getLetters(Rack.MAX_TILES));
}

Rack.prototype.createTilePlaceholders = function()
{
    let pos = {x: 35, y: -5};

    for (var i = 0; i < Rack.MAX_TILES; i++)
    {
        var ph = new PIXI.Container();
        ph.position.set(pos.x, pos.y);
        pos.x += GridSquare.SIZE + 5;
        this.addChild(ph);
        this.placeHolders.push(ph);
    }
};

Rack.prototype.addLetters = function(letters)
{
    while (letters.length)
    {
        let char = letters.shift().toUpperCase();
        let tile = new Tile(char);
        this.getAvailablePlaceholder().addChild(tile);
        this.tiles.push(tile);
    }
};

Rack.prototype.getAvailablePlaceholder = function()
{
    return this.placeHolders.find(e => e.children.length == 0);
};

Rack.prototype.getCurrentTile = function()
{
    return this.tiles.filter(tile=>tile.dragging)[0];
};
