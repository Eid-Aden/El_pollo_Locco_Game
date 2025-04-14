class EndBoss extends MovableObjects {
  width = 350;
  height = 430;
  y = 20;
  walkingImage = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  constructor() {
    super();
    this.loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.walkingImage);

    this.x = 2000;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.walkingImage);
    }, 200);
  }
}
