let canvas;
let world;

let keyboard = new Keyboard();

function init() {
  initLevel1();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  SoundManager.play(world.backgroundSound);
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
  const icon = document.getElementById('muteIcon_desktop');
  if (SoundManager.isMuted) {
    SoundManager.unmuteAll();
    icon.src = 'img/volume.png';
  } else {
    SoundManager.muteAll();
    icon.src = 'img/mute.png';
  }
}

function startGame() {
  if (world && typeof world.stopAllIntervals === 'function') {
    world.stopAllIntervals();
  }

  document.getElementById('restartBtn').style.display = 'none';
  document.getElementById('youWin').style.display = 'none';

  if (window.innerWidth > 878) {
    document.getElementById('soundMute').style.display = 'flex';
  }

  document.getElementById('llcover').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
  SoundManager.play(this.backgroundSound);

  init();
}

function restartGame() {
  location.reload();
}

function toggleBox(boxId) {
  const allBoxes = [document.getElementById('storyBox'), document.getElementById('howToUseBox'), document.getElementById('impresseum')];

  const selectedBox = document.getElementById(boxId);
  const isVisible = selectedBox.classList.contains('show');

  allBoxes.forEach((box) => {
    if (box !== selectedBox) {
      box.classList.remove('show');
      box.style.display = 'none';
    }
  });

  if (!isVisible) {
    selectedBox.style.display = 'block';
    setTimeout(() => selectedBox.classList.add('show'), 10);
  } else {
    selectedBox.classList.remove('show');
    setTimeout(() => (selectedBox.style.display = 'none'), 500);
  }
}
