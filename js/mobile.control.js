/* window.addEventListener('load', MobileControls);

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
      e.preventDefault(); // verhindert das lange Tippen-Menü
      keyboard[key] = true;
    });

    controlBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keyboard[key] = false;
    });
  });
}

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

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);
