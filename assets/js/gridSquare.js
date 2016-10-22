/**
 * Created by zmark_000 on 02/10/2016.
 */

GridSquare.prototype = Object.create(PIXI.Container.prototype);
GridSquare.prototype.constructor = GridSquare;

GridSquare.SIZE = 50;

GridSquare.TYPES = {
    BLANK:          "BLANK",
    MIDDLE:         "MIDDLE",
    DOUBLE_LETTER:  "DOUBLE_LETTER",
    DOUBLE_WORD:    "DOUBLE_WORD",
    TRIPLE_LETTER:  "TRIPLE_LETTER",
    TRIPLE_WORD:    "TRIPLE_WORD"
};

GridSquare.COLOURS = {
    BLANK:          0x0C776A,
    MIDDLE:         0xF79D8D,
    DOUBLE_LETTER:  0x72B7E4,
    DOUBLE_WORD:    0xF69888,
    TRIPLE_LETTER:  0x2384C5,
    TRIPLE_WORD:    0xED3237
};

function GridSquare(id, position, type)
{
    PIXI.Container.call(this);
    this.id = id;
    this.position = position;

    this.type = type || GridSquare.TYPES.BLANK;

    this.back = new PIXI.Graphics();
    this.back.beginFill(GridSquare.COLOURS[this.type], 1);
    this.back.lineStyle(2, 0x000000, 1);
    this.back.drawRect(0, 0, GridSquare.SIZE, GridSquare.SIZE);
    this.back.endFill();

    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(0, 0, GridSquare.SIZE, GridSquare.SIZE);

    this.mouseover = function()
    {
        this.highlight = new PIXI.Graphics();
        this.highlight.beginFill(0xFFFFFF, 0.4);
        this.highlight.drawRect(0, 0, GridSquare.SIZE, GridSquare.SIZE);
        this.highlight.endFill();
        this.addChild(this.highlight);
    }.bind(this);

    this.mouseout = function()
    {
        if (this.highlight)
        {
            this.removeChild(this.highlight);
        }
    }.bind(this);
    
    this.addChild(this.back);
}