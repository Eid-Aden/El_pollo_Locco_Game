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

window.addEventListener('load', MobileControls);

function checkOrientation() {
  const isMobile = window.innerWidth < 720;
  const isPortrait = window.innerHeight > window.innerWidth;

  const hint = document.getElementById('rotateHint');

  if (isMobile && isPortrait) {
    hint.style.display = 'block';
  } else {
    hint.style.display = 'none';
  }
}

// Beim Laden prüfen
window.addEventListener('load', checkOrientation);

// Beim Drehen des Geräts prüfen
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
