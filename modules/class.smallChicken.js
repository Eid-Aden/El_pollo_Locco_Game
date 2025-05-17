class SmallChicken extends MovableObjects {
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
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  deadImage = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImage(this.walkingImage);
    this.x = 1500 + Math.random() * 500;
    this.speed = 0.8 + Math.random() * 1;

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
