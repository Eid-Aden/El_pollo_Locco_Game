class EndBoss extends MovableObjects {
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  width = 350;
  height = 430;
  y = 50;
  walkingImage = ['img/4_enemie_boss_chicken/1_walk/G1.png', 'img/4_enemie_boss_chicken/1_walk/G2.png', 'img/4_enemie_boss_chicken/1_walk/G3.png'];

  alertImage = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  attackImage = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  hurtImage = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png', 'img/4_enemie_boss_chicken/4_hurt/G23.png'];

  deadImage = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png', 'img/4_enemie_boss_chicken/5_dead/G26.png'];

  constructor() {
    super();
    this.loadImage(this.walkingImage[0]);
    this.loadImages(this.walkingImage);
    this.loadImages(this.attackImage);
    this.loadImages(this.alertImage);
    this.loadImages(this.hurtImage);
    this.loadImages(this.deadImage);

    this.x = 3000;
    this.speed = 0.01 + Math.random() * 0.2;
    this.animate();
    this.isDead = false;
  }
  ttackStartTime = null;

  animate() {
    setInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      if (!this.isDead) {
        this.movLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      if (this.isDead) {
        this.loadImage(this.deadImage[0]);
        return;
      }

      if (this.world && this.world.character) {
        let distance = Math.abs(this.x - this.world.character.x);
        if (distance < 400) {
          this.speed = 0.8 + Math.random() * 0.9;

          this.playAnimation(this.attackImage);

          this.world.character.hit();
        } else {
          this.playAnimation(this.walkingImage);
        }
      } else {
        this.playAnimation(this.walkingImage);
      }
    }, 200);
  }
}
