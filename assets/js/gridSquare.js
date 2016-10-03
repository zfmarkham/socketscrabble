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
    if (this.letter)
    {
        this.removeChild(this.letter);
    }

    this.letter = new PIXI.Text(
        value,
        {font: "32px sans-serif", fill: "white", align: 'center'}
    );

    this.letter.position.set((this.width - this.letter.width) / 2, (this.height - this.letter.height) / 2);

    this.addChild(this.letter);
};

GridSquare.prototype.onKeyDown = function(key)
{
    key.preventDefault();
    if (key.keyCode >= 65 && key.keyCode <= 90)
    {
        this.setLetter(String.fromCharCode(key.keyCode));
    }
};