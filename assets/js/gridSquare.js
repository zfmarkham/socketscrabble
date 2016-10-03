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

// TODO: Move this into Tile, also surely there's a better way?
GridSquare.LETTER_VALUES = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10
};

function GridSquare(position, type)
{
    PIXI.Container.call(this);
    this.position = position;

    this.type = type || GridSquare.TYPES.BLANK;

    this.back = new PIXI.Graphics();
    this.back.beginFill(GridSquare.COLOURS[this.type], 1);
    this.back.lineStyle(2, 0x000000, 1);
    this.back.drawRect(0, 0, GridSquare.SIZE, GridSquare.SIZE);
    this.back.endFill();

    this.back.interactive = true;
    this.back.hitArea = new PIXI.Rectangle(0, 0, GridSquare.SIZE, GridSquare.SIZE);

    this.back.mouseover = function(mouseData)
    {
        this.highlight = new PIXI.Graphics();
        this.highlight.beginFill(0xFFFFFF, 0.4);
        this.highlight.drawRect(0, 0, GridSquare.SIZE, GridSquare.SIZE);
        this.highlight.endFill();
        this.addChild(this.highlight);

        this.keyDownHandler = this.onKeyDown.bind(this);

        document.addEventListener('keydown', this.keyDownHandler);
    }.bind(this);

    this.back.mouseout = function(mouseData)
    {
        if (this.highlight)
        {
            this.removeChild(this.highlight);
        }

        document.removeEventListener('keydown', this.keyDownHandler);
        this.keyDownHandler = null;
    }.bind(this);
    
    this.addChild(this.back);
}

GridSquare.prototype.setLetter = function(value)
{
    if (this.tile)
    {
        this.removeChild(this.tile);
    }

    this.tile = new PIXI.Graphics();
    this.tile.beginFill(0xF3D998, 1);
    this.tile.lineStyle(2, 0x000000, 1);
    this.tile.drawRoundedRect(0, 0, GridSquare.SIZE, GridSquare.SIZE, 4);
    this.tile.endFill();

    this.letter = new PIXI.Text(
        value,
        {fontFamily: "sans-serif", fontSize: 32, fill: 0x052A05}
    );

    this.value = new PIXI.Text(
        GridSquare.LETTER_VALUES[value],
        {fontFamily: "sans-serif", fontSize: 14, fontWeight: 'bold', fill: 0x052A05}
    );

    var valuePadding = 2;
    this.letter.position.set((this.width - this.letter.width) / 2, (this.height - this.letter.height) / 2);
    this.value.position.set(this.width - this.value.width - valuePadding, this.height - this.value.height - valuePadding);

    this.tile.addChild(this.letter);
    this.tile.addChild(this.value);
    this.addChild(this.tile);
};

GridSquare.prototype.onKeyDown = function(key)
{
    key.preventDefault();
    if (key.keyCode >= 65 && key.keyCode <= 90)
    {
        this.setLetter(String.fromCharCode(key.keyCode).toUpperCase());
    }
};