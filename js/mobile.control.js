function MobileControls() {
  const buttons = [
    { id: 'btn-left', key: 'LEFT' },
    { id: 'btn-right', key: 'RIGHT' },
    { id: 'btn-space', key: 'SPACE' },
    { id: 'btn-bottle', key: 'D' },
  ];

  buttons.forEach(({ id, key }) => {
    const controlBnt = document.getElementById(id);
    controlBnt.addEventListener('touchstart', () => (keyboard[key] = true));
    controlBnt.addEventListener('touchend', () => (keyboard[key] = false));
  });
}

/* window.addEventListener('load', MobileControls);

*/

function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  const isSmallDevice = window.innerWidth <= 1024; // max Breite für Handys und kleine Tablets

  const hint = document.getElementById('rotateHint');

  if (isSmallDevice && isPortrait) {
    hint.style.display = 'block';
  } else {
    hint.style.display = 'none';
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);
