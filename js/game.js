/** @type {HTMLCanvasElement} The game's canvas element */
let canvas;

/** @type {World} The main game world instance */
let world;

/** @type {Keyboard} The global keyboard input object */
let keyboard = new Keyboard();

/**
 * Initializes the game:
 * - Loads level 1
 * - Sets up the canvas
 * - Creates a new World instance with canvas and keyboard
 * - Starts background sound
 */

function init() {
  initLevel1();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  SoundManager.initFromStorage();
  SoundManager.play(world.backgroundSound);
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
  if (e.keyCode == 39) keyboard.RIGHT = true; // Right arrow
  if (e.keyCode == 37) keyboard.LEFT = true; // Left arrow
  if (e.keyCode == 38) keyboard.UP = true; // Up arrow
  if (e.keyCode == 40) keyboard.DOWN = true; // Down arrow
  if (e.keyCode == 32) keyboard.SPACE = true; // Space bar
  if (e.keyCode == 68) keyboard.D = true; // Key D (throw)
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
  const icon = document.getElementById('muteIcon_desktop');

  if (SoundManager.isMuted) {
    SoundManager.unmuteAll();
    icon.src = 'img/volume.png';
  } else {
    SoundManager.muteAll();
    icon.src = 'img/mute.png';
  }
}

/**
 * Starts the game by resetting UI, enabling controls, initializing world state,
 * and playing background sound.
 */
function startGame() {
  SoundManager.initFromStorage();
  MobileControls();
  stopPreviousGameIfRunning();
  resetGameUI();
  showMainGameUI();

  init();

  // Slight delay to avoid overlapping with init sound setup
  setTimeout(() => {
    SoundManager.play(world.backgroundSound);
  }, 200);
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
  document.querySelector('.restart-overlay').style.display = 'none';
  document.getElementById('gameOverImg').style.display = 'none';
  document.getElementById('llcover').style.display = 'block';
  SoundManager.pauseAll();
}
