/**
 * Created by zmark_000 on 05/10/2016.
 */


Tile.prototype = Object.create(PIXI.Container.prototype);
Tile.prototype.constructor = Tile;

Tile.LETTER_VALUES = {
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

function Tile(letter)
{
    PIXI.Container.call(this);


    this.letter = letter;
    this.value = Tile.LETTER_VALUES[this.letter];

    let gfx = new PIXI.Graphics();
    gfx.beginFill(0xF3D998, 1);
    gfx.lineStyle(2, 0x000000, 1);
    gfx.drawRoundedRect(0, 0, GridSquare.SIZE, GridSquare.SIZE, 4);
    gfx.endFill();

    let letterText = new PIXI.Text(
        this.letter,
        {fontFamily: "sans-serif", fontSize: 32, fill: 0x052A05}
    );

    let value = new PIXI.Text(
        this.value,
        {fontFamily: "sans-serif", fontSize: 14, fontWeight: 'bold', fill: 0x052A05}
    );

    const valuePadding = 2;
    letterText.position.set((gfx.width - letterText.width) / 2, (gfx.height - letterText.height) / 2);
    value.position.set(gfx.width - value.width - valuePadding, gfx.height - value.height - valuePadding);

    gfx.addChild(letterText);
    gfx.addChild(value);
    this.addChild(gfx);

    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(0, 0, GridSquare.SIZE, GridSquare.SIZE);
    
    this.mousedown = this.touchstart = this.startDrag;
    this.mouseup = this.touchend = this.stopDrag;
    this.mouseupoutside = this.touchendoutside = this.stopDrag;
    this.mousemove = this.touchmove = this.onMouseMove;
}

Tile.prototype.startDrag = function(mouseData)
{
    this.dragging = true;
    this.dragOffset = mouseData.data.getLocalPosition(this);
};

Tile.prototype.stopDrag = function(mouseData)
{
    this.dragging = false;
};

Tile.prototype.onMouseMove = function(mouseData)
{
    if (this.dragging)
    {
        var pos = mouseData.data.getLocalPosition(this.parent);
        this.position.set(pos.x - this.dragOffset.x, pos.y - this.dragOffset.y);
    }
};