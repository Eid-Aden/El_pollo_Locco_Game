/* let canvas;
let ctx;
let character = new Image();

function init() {
  canvas = document.getElementById('canvas'); // vorausgesetzt, dein Canvas-Element hat die id="canvas"
  character.src = 'img/2_character_pepe/2_walk/W-21.png';
  
  ctx = canvas.getContext('2d');
  
  character.onload = function() { // sicherstellen, dass das Bild zuerst geladen ist
    ctx.drawImage(character, 20, 20, 50, 100);
  };
} */

let canvas;
let ctx;
let character = new Image();

function init() {
  canvas = document.getElementById('canvas'); // vorausgesetzt, dein Canvas-Element hat die id="canvas"
  character.src = 'img/2_character_pepe/2_walk/W-21.png';

  ctx = canvas.getContext('2d');
  ctx.drawImage(character, 20, 20, 50, 100);

  /*  character.onload = function () {
    // sicherstellen, dass das Bild zuerst geladen ist
    ctx.drawImage(character, 20, 20, 50, 100);
  };*/
}
