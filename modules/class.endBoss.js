class EndBoss extends MovableObjects {
  y = 255;
  width = 300;
  height = 230;
  walkingEndBoss = [
    '/img/4_enemie_boss_chicken/2_alert/G5.png',
    '/img/4_enemie_boss_chicken/2_alert/G6.png',
    '/img/4_enemie_boss_chicken/2_alert/G7.png',
    '/img/4_enemie_boss_chicken/2_alert/G8.png',
    '/img/4_enemie_boss_chicken/2_alert/G9.png',
    '/img/4_enemie_boss_chicken/2_alert/G10.png',
    '/img/4_enemie_boss_chicken/2_alert/G11.png',
    '/img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  constructor() {
    super().loadImage('/img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.walkingEndBoss);
    this.x = 2500;

    this.animate();
  }

  animate() {
    this.movLeft();
    setInterval(() => {
      this.playAnimation(this.walkingEndBoss);
    }, 100);
  }
}
