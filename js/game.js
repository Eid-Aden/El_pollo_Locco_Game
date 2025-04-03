let canvas;
let ctx;
let world = new World();

function init() {
  canvas = document.getElementById('canvas'); // vorausgesetzt, dein Canvas-Element hat die id="canvas"

  ctx = canvas.getContext('2d');

  console.log(' meine  Charact ist', world.character);

  // sicherstellen, dass das Bild zuerst geladen ist

  /*  character.onload = function () {
    
    ctx.drawImage(character, 20, 20, 50, 100);
  };*/
}
