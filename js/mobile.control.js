/**
 * Initializes mobile touch controls for movement and actions.
 * Binds `touchstart` and `touchend` events to on-screen buttons,
 * and maps them to the `keyboard` object used for input handling.
 *
 * Buttons:
 * - 'btn-left' → LEFT
 * - 'btn-right' → RIGHT
 * - 'btn-space' → SPACE (jump)
 * - 'btn-bottle' → D (throw)
 */
function MobileControls() {
  const buttons = [
    { id: 'btn-left', key: 'LEFT' },
    { id: 'btn-right', key: 'RIGHT' },
    { id: 'btn-space', key: 'SPACE' },
    { id: 'btn-bottle', key: 'D' },
  ];

  buttons.forEach(({ id, key }) => {
    const controlBtn = document.getElementById(id);

    controlBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard[key] = true;
    });

    controlBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard[key] = false;
    });
  });
}

/**
 * Checks the screen orientation and device size to determine
 * whether the rotate hint should be shown.
 *
 * - Shows the hint if the device is small (≤1024px width) and in portrait mode.
 * - Hides the hint otherwise.
 */
function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  const isSmallDevice = window.innerWidth <= 1024;

  const hint = document.getElementById('rotateHint');

  if (isSmallDevice && isPortrait) {
    hint.style.display = 'flex';
  } else {
    hint.style.display = 'none';
  }
}

/***
 * Initializes mobile controls and orientation check on page load.
 */
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

window.addEventListener('load', checkOrientation);
