class Chicken extends MovableObjects {
  y = 360;
  width = 60;
  height = 80;
  speed = 1;
  offset = {
    top: 0,
    right: 0,
    bottom: 50,
    left: 0,
  };
  walkingImage = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  deadImage = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
  walkingSound = new Audio('audio/chickenSound.mp3');

  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImage(this.deadImage);
    this.x = 2000 + Math.random() * 500;
    this.speed = 0.12 + Math.random() * 0.25;

    this.loadImages(this.walkingImage);
    this.animate();
    this.isDead = false;
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.movLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.walkingImage);
      } else {
        this.loadImage(this.deadImage[0]);
      }
    }, 100);
  }
}
