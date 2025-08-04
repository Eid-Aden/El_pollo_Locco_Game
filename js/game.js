/** @type {HTMLCanvasElement} The game's canvas element */
let canvas;

/** @type {World} The main game world instance */
let world;

/** @type {Keyboard} The global keyboard input object */
let keyboard = new Keyboard();

const allImages = [
  'img/5_background/layers/air.png',
  'img/5_background/layers/1_first_layer/1.png',
  'img/5_background/layers/1_first_layer/2.png',
  'img/5_background/layers/2_second_layer/1.png',
  'img/5_background/layers/2_second_layer/2.png',
  'img/5_background/layers/3_third_layer/1.png',
  'img/5_background/layers/3_third_layer/2.png',
  'img/5_background/layers/1_first_layer/full.png',
  'img/5_background/layers/2_second_layer/full.png',
  'img/5_background/layers/3_third_layer/full.png',
  'img/5_background/layers/4_clouds/1.png',
  'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
  'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
  'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
  'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
  'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  'img/6_salsa_bottle/salsa_bottle.png',
  'img/8_coin/coin_1.png',
  'img/8_coin/coin_2.png',
];

/**
 * Preload-Funktion
 */
function preloadImages(imagePaths) {
  return Promise.all(
    imagePaths.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    })
  );
}

/**
 * Initializes the game:
 * - Loads level 1
 * - Sets up the canvas
 * - Creates a new World instance with canvas and keyboard
 * - Starts background sound
 */

async function init() {
  canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  document.getElementById('loadingScreen').style.display = 'flex';
  await new Promise((resolve) => setTimeout(resolve, 500));
  await preloadImages(allImages);

  initLevel1();
  world = new World(canvas, keyboard);
  if (!SoundManager.isMuted) {
    SoundManager.play(world.backgroundSound);
  }
  document.getElementById('loadingScreen').style.display = 'none';
}

/**
 * Requests fullscreen mode for the game canvas.
 * Compatible with standard, WebKit, and MS browsers.
 */
function openFullscreen() {
  let canvas = document.getElementById('canvas');

  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
}

/**
 * Listens for keydown events and updates the keyboard object.
 * Maps arrow keys, space bar, and "D" key to movement and actions.
 */
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
  if (e.keyCode == 68) keyboard.D = true;
});

/**
 * Listens for keyup events and resets the keyboard object.
 * Ensures smooth control when keys are released.
 */
window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40) keyboard.DOWN = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
  if (e.keyCode == 68) keyboard.D = false;
});

/**
 * Toggles the sound state (mute/unmute) for desktop view.
 * - Changes the mute icon based on the current sound state.
 * - Uses SoundManager to control global audio playback.
 */

function toggleMute() {
  if (SoundManager.isMuted) {
    SoundManager.unmuteAll();
  } else {
    SoundManager.muteAll();
  }
  updateMuteIcon();
}

function updateMuteIcon() {
  const icon = document.getElementById('muteIcon_desktop');
  if (!icon) return;

  if (SoundManager.isMuted) {
    icon.src = 'img/mute.png';
  } else {
    icon.src = 'img/volume.png';
  }
}

/**
 * Starts the game by resetting UI, enabling controls, initializing world state,
 * and playing background sound.
 */

async function startGame() {
  SoundManager.initFromStorage();
  updateMuteIcon();

  MobileControls();
  stopPreviousGameIfRunning();
  resetGameUI();
  showMainGameUI();

  await init();
}

/**
 * Stops any existing game intervals if the world is already defined.
 */
function stopPreviousGameIfRunning() {
  if (world && typeof world.stopAllIntervals === 'function') {
    world.stopAllIntervals();
  }
}

/**
 * Hides all overlay elements (like Game Over or Win screens).
 */
function resetGameUI() {
  document.getElementById('youWinOverlay').style.display = 'none';
  document.getElementById('restart-overlayNone').style.display = 'none';
}

/**
 * Displays canvas and UI elements for active gameplay.
 */
function showMainGameUI() {
  if (window.innerWidth > 878) {
    document.getElementById('soundMute').style.display = 'flex';
  }
  document.getElementById('llcover').style.display = 'none';
  document.getElementById('canvas-wrapper').style.display = 'flex';
  document.getElementById('canvas').style.display = 'flex';
}

function restartGame() {
  startGame();
  document.getElementById('restart-button').style.display = 'none';
}

/**
 * Toggles the visibility of an info box (e.g. Story, How to Use, Impressum).
 * Ensures only one box is visible at a time with smooth transitions.
 *
 * @param {string} boxId - The ID of the box to toggle (e.g. 'storyBox')
 */
function toggleBox(boxId) {
  const allBoxes = [
    document.getElementById('storyBox'),
    document.getElementById('howToUseBox'),
    document.getElementById('impresseum'),
  ];
  const selectedBox = document.getElementById(boxId);
  const isVisible = selectedBox.classList.contains('show');
  hideOtherBoxes(allBoxes, selectedBox);
  if (!isVisible) {
    showBox(selectedBox);
  } else {
    hideBox(selectedBox);
  }
}

/**
 * Hides all boxes except the selected one.
 *
 * @param {HTMLElement[]} boxes - Array of all box elements
 * @param {HTMLElement} selected - The currently selected box
 */
function hideOtherBoxes(boxes, selected) {
  boxes.forEach((box) => {
    if (box && box !== selected) {
      box.classList.remove('show');
      box.style.display = 'none';
    }
  });
}

/**
 * Displays the selected box with a fade-in effect.
 *
 * @param {HTMLElement} box - The box to display
 */
function showBox(box) {
  box.style.display = 'block';
  setTimeout(() => box.classList.add('show'), 10);
}
/**
 * Hides the selected box with a fade-out effect.
 *
 * @param {HTMLElement} box - The box to hide
 */
function hideBox(box) {
  box.classList.remove('show');
  setTimeout(() => (box.style.display = 'none'), 500);
}

/**
 * Returns the game to the home screen by:
 * - Stopping all active game intervals,
 * - Hiding all game-related overlays and the canvas,
 * - Showing the landing screen (`llcover`),
 * - Pausing all active sounds.
 *
 * Used when the player navigates back to the main menu.
 */
function goToHome() {
  if (world && typeof world.stopAllIntervals === 'function') {
    world.stopAllIntervals();
  }
  document.getElementById('canvas-wrapper').style.display = 'none';
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('youWinOverlay').style.display = 'none';
  document.querySelector('.hollcontainer').style.display = 'none';
  document.getElementById('gameOverImg').style.display = 'none';
  document.getElementById('llcover').style.display = 'block';
  SoundManager.pauseAll();
}
