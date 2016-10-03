/**
 * Created by zmark_000 on 02/10/2016.
 */

Grid.prototype = Object.create(PIXI.Container.prototype);
Grid.prototype.constructor = Grid;

Grid.GRID_ROWS      = 15;
Grid.GRID_COLUMNS   = 15;

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

function Grid()
{
    PIXI.Container.call(this);
    this.position.x = 50;
    this.position.y = 50;

    var gfx = new PIXI.Graphics();
    gfx.beginFill(0xCCCCCC, 1);
    gfx.lineStyle(20, 0xFFFFFF, 1);
    gfx.drawRect(0, 0, Grid.GRID_COLUMNS * GridSquare.SIZE, Grid.GRID_ROWS * GridSquare.SIZE);
    gfx.endFill();

    this.addChild(gfx);

    this.createGridSquares();
}

Grid.prototype.createGridSquares = function()
{
    for (var i = 0; i < Grid.GRID_ROWS; i++)
    {
        for (var j = 0; j < Grid.GRID_COLUMNS; j++)
        {
            var gridSquareType = Grid.SPECIAL_SQUARE_COORDS.filter(function(e){return e.x == i && e.y == j})[0];
            var gridSquare = new GridSquare({x: j * GridSquare.SIZE, y: i * GridSquare.SIZE}, gridSquareType ? gridSquareType.type : undefined);
            this.addChild(gridSquare);
        }
    }
};