class Character extends MovableObjects {
  width = 200;
  height = 280;
  y = 160;

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
  speed = 5;
  world;
  walkingSound = new Audio('audio/running.mp3');
  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');

    this.loadImages(this.walkingImage);
    this.loadImages(this.walkingJumping);
    this.aplyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walkingSound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walkingSound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.speedY = 35;
      }

      this.world.camara_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.walkingJumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.walkingImage);
        }
      }
    }, 50);
  }

  jump() {
    console.log('Character jumps!');
  }
}
