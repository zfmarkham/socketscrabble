var renderer = PIXI.autoDetectRenderer(256, 256);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

// TODO move this into CSS
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

createGrid();
update();

function createGrid()
{
    this.grid = new Grid();
    this.rack = new Rack();
    stage.addChild(this.grid);
    stage.addChild(this.rack);
}

function update()
{
    requestAnimationFrame(update);
    renderer.render(stage);
}