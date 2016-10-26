/**
 * Created by zmark_000 on 02/10/2016.
 */

Grid.prototype = Object.create(PIXI.Container.prototype);
Grid.prototype.constructor = Grid;

Grid.GRID_ROWS      = 15;
Grid.GRID_COLUMNS   = 15;
Grid.BORDER_WIDTH   = 20;

Grid.SPECIAL_SQUARE_COORDS = [
    // MIDDLE
    {x: 7, y: 7, type: GridSquare.TYPES.MIDDLE},
    
    // DOUBLE LETTERS
    {x:  0, y:  3, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  0, y: 11, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  2, y:  6, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  2, y:  8, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  3, y:  0, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  3, y:  7, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  3, y: 14, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  6, y:  2, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  6, y:  6, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  6, y:  8, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  6, y: 12, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  7, y:  3, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  7, y: 11, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  8, y:  2, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  8, y:  6, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  8, y:  8, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x:  8, y: 12, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 11, y:  0, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 11, y:  7, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 11, y: 14, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 12, y:  6, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 12, y:  8, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 14, y:  3, type: GridSquare.TYPES.DOUBLE_LETTER},
    {x: 14, y: 11, type: GridSquare.TYPES.DOUBLE_LETTER},

    // DOUBLE WORDS
    {x:  1, y:  1, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  2, y:  2, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  3, y:  3, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  4, y:  4, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 10, y: 10, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 11, y: 11, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 12, y: 12, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 13, y: 13, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  1, y: 13, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  2, y: 12, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  3, y: 11, type: GridSquare.TYPES.DOUBLE_WORD},
    {x:  4, y: 10, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 10, y:  4, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 11, y:  3, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 12, y:  2, type: GridSquare.TYPES.DOUBLE_WORD},
    {x: 13, y:  1, type: GridSquare.TYPES.DOUBLE_WORD},

    // TRIPLE LETTER
    {x:  1, y:  5, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  1, y:  9, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  5, y:  1, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  5, y:  5, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  5, y:  9, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  5, y: 13, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  9, y:  1, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  9, y:  5, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  9, y:  9, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x:  9, y: 13, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x: 13, y:  5, type: GridSquare.TYPES.TRIPLE_LETTER},
    {x: 13, y:  9, type: GridSquare.TYPES.TRIPLE_LETTER},

    // TRIPLE WORD
    {x:  0, y:  0, type: GridSquare.TYPES.TRIPLE_WORD},
    {x:  0, y:  7, type: GridSquare.TYPES.TRIPLE_WORD},
    {x:  0, y: 14, type: GridSquare.TYPES.TRIPLE_WORD},
    {x:  7, y:  0, type: GridSquare.TYPES.TRIPLE_WORD},
    {x:  7, y: 14, type: GridSquare.TYPES.TRIPLE_WORD},
    {x: 14, y:  0, type: GridSquare.TYPES.TRIPLE_WORD},
    {x: 14, y:  7, type: GridSquare.TYPES.TRIPLE_WORD},
    {x: 14, y: 14, type: GridSquare.TYPES.TRIPLE_WORD}

];

const socket = io.connect('http://zfmarkham.servehttp.com:3000');

function Grid()
{
    PIXI.Container.call(this);
    this.position.x = 50;
    this.position.y = 50;

    var gfx = new PIXI.Graphics();
    gfx.beginFill(0xCCCCCC, 1);
    gfx.lineStyle(Grid.BORDER_WIDTH, 0xFFFFFF, 1);
    gfx.drawRect(0, 0, Grid.GRID_COLUMNS * GridSquare.SIZE, Grid.GRID_ROWS * GridSquare.SIZE);
    gfx.endFill();

    this.addChild(gfx);

    this.createGridSquares();

    this.rack = this.addChild(new Rack());

    this.interactive = true;
    this.mousedown = this.touchstart = this.onMouseDown;
    this.mouseup = this.touchend = this.onMouseRelease;

    this.submitWordBtn = this.addChild(new PIXI.Container());
    this.submitWordBtn.setTransform(this.rack.x + this.rack.width + 10, this.rack.y + (this.rack.height / 2));
    this.submitWordBtn.gfx = new PIXI.Graphics();
    this.submitWordBtn.gfx.beginFill(0xCCCCCC, 1);
    this.submitWordBtn.gfx.drawRoundedRect(0, 0, 150, this.rack.height / 2, 4);
    this.submitWordBtn.gfx.endFill();
    this.submitWordBtn.addChild(this.submitWordBtn.gfx);
    this.submitWordBtn.interactive = true;
    this.submitWordBtn.buttonMode = true;
    this.submitWordBtn.addChild(new PIXI.Text("SUBMIT WORD", {fill: 'red', fontSize: '20px'}));
    this.submitWordBtn.on("click", this.onSubmitWordPressed.bind(this));
    
    socket.on('letterPlaced', function(data){
        let tile = new Tile(data.letter);
        this.gridSquares.find(el=>el.id == data.gridSquareId).addChild(tile);
    }.bind(this));

    this.placedTiles = [];
}

Grid.prototype.createGridSquares = function()
{
    this.gridSquares = [];

    for (var i = 0; i < Grid.GRID_ROWS; i++)
    {
        for (var j = 0; j < Grid.GRID_COLUMNS; j++)
        {
            var gridSquareType = Grid.SPECIAL_SQUARE_COORDS.filter(function(e){return e.x == i && e.y == j})[0];
            var gridSquare = new GridSquare(i, j, i * Grid.GRID_COLUMNS + j, {x: j * GridSquare.SIZE, y: i * GridSquare.SIZE}, gridSquareType ? gridSquareType.type : undefined);
            this.addChild(gridSquare);
            this.gridSquares.push(gridSquare);
        }
    }
};

Grid.prototype.onMouseRelease = function(mousedata)
{
    let tile = this.rack.getCurrentTile();

    if (tile)
    {

        // TODO Make sure the gridSquare to be placed on isn't already occupied

        tile.dragging = false;
        let  pos = mousedata.data.getLocalPosition(this.parent);

        // Check to see if mouse coords fall within a gridSquare
        let  gridSquare = this.gridSquares.find(function(el) {
            let local = el.toLocal(pos);
            return el.hitArea.contains(local.x, local.y);
        });

        if (gridSquare)
        {
            if (gridSquare.children.length == 1)
            {
                // Attach Tile to grid square
                tile.setParent(gridSquare);
                socket.emit('letterPlaced', {letter: tile.letter, globalPos: tile.toGlobal(tile.position), gridSquareId: gridSquare.id});
                this.placedTiles.push(tile);
            }
        }

        // If mouse if released outside of board or on an occupied gridSquare, then setting position to 0,0 will be 0,0 on the rack placeholder
        // it was already attached to. If it has been released on an unoccupied gridSquare then 0,0 will refer to 0,0 of the gridSquare
        tile.position.set(0, 0);
    }
};

Grid.prototype.onMouseDown = function(mousedata)
{
    let tile = this.rack.getCurrentTile();

    // Make the rack the parent object to the Tile again, otherwise layering issues occur with grid squares that were spawned
    // after the one the Tile is currently attached to.
    if (tile && !this.rack.children.includes(tile.parent))
    {
        tile.setParent(this.rack.getAvailablePlaceholder());
        tile.onMouseMove(mousedata);
    }
};

Grid.prototype.onSubmitWordPressed = function(mousedata)
{
    // Make sure all tile are on either the same row or same column
    // If one of these yields undefined, then we can assume all tiles are on same plane for that test
    var tilesOnSameRow = this.placedTiles.find((e, i, a) => e.parent.row != a[0].parent.row);
    var tilesOnSameCol = this.placedTiles.find((e, i, a) => e.parent.column != a[0].parent.column);
    
    // Next check for gaps between letters
    
    // Next check to see if those gaps are populated with existing letters
    
    // Next check all those letters (plus previously existing letter) make a valid word
};