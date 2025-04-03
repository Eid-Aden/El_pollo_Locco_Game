let canvas;
let world;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);

  console.log(' meine  Charact ist', world.character);
}
