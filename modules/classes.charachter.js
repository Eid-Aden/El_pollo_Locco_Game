class Character extends MovableObjects {
  y = 160;
  speed = 20;
  speedY = 0;
  width = 200;
  height = 280;

  offset = {
    top: 20,
    right: 20,
    bottom: 0,
    left: 20,
  };

  walkingImage = [
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-26.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  walkingJumping = [
    '/img/2_character_pepe/3_jump/J-31.png',
    '/img/2_character_pepe/3_jump/J-32.png',
    '/img/2_character_pepe/3_jump/J-33.png',
    '/img/2_character_pepe/3_jump/J-34.png',
    '/img/2_character_pepe/3_jump/J-35.png',
    '/img/2_character_pepe/3_jump/J-36.png',
    '/img/2_character_pepe/3_jump/J-37.png',
    '/img/2_character_pepe/3_jump/J-38.png',
    '/img/2_character_pepe/3_jump/J-39.png',
  ];

  walkingDead = [
    '/img/2_character_pepe/5_dead/D-51.png',
    '/img/2_character_pepe/5_dead/D-52.png',
    '/img/2_character_pepe/5_dead/D-53.png',
    '/img/2_character_pepe/5_dead/D-54.png',
    '/img/2_character_pepe/5_dead/D-55.png',
    '/img/2_character_pepe/5_dead/D-56.png',
    '/img/2_character_pepe/5_dead/D-57.png',
  ];

  walkingHurt = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

  world;
  walkingSound = new Audio('audio/running.mp3');
  hurtSound = new Audio('audio/hurt.mp3');
  deadSound = new Audio('audio/Dead.mp3');

  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.walkingHurt);
    this.loadImages(this.walkingDead);
    this.loadImages(this.walkingJumping);
    this.loadImages(this.walkingImage);

    this.aplyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walkingSound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.movLeft();
        this.otherDirection = true;
        this.walkingSound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camara_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.walkingDead);
      } else if (this.isHurt()) {
        this.playAnimation(this.walkingHurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.walkingJumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.walkingImage);
        }
      }
    }, 50);
  }
}
