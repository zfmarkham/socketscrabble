var renderer = PIXI.autoDetectRenderer(256, 256);

document.body.appendChild(renderer.view);
renderer.view.classList += "ss-Canvas";

var stage = new PIXI.Container();

renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

createGrid();
update();

function createGrid()
{
    this.grid = new Grid();
    stage.addChild(this.grid);
}

function update()
{
    requestAnimationFrame(update);
    renderer.render(stage);
}


window.addEventListener("resize", function () {
    renderer.resize(window.innerWidth, window.innerHeight);
});