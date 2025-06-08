let canvas;
let world;

let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function openFullscreen() {
  let canvas = document.getElementById('canvas');

  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen(); // für Safari
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen(); // für ältere IE-Versionen
  }
}

window.addEventListener('keydown', (e) => {
  console.log(e.keyCode);
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function toggleMute() {
  const icon = document.getElementById('muteIcon');
  if (SoundManager.isMuted) {
    SoundManager.unmuteAll();
    icon.src = 'img/volume.png';
  } else {
    SoundManager.muteAll();
    icon.src = 'img/mute.png';
  }
}

function startGame() {
  document.getElementById('llcover').style.display = 'none';

  document.getElementById('canvas').style.display = 'block';
  document.getElementById('soundMute').style.display = 'flex';

  init();
}
function restartGame() {
  location.reload();
  startGame();
}
