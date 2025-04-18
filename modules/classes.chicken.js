class Chicken extends MovableObjects {
  y = 360;
  width = 60;
  height = 80;
  speed = 1;
  walkingImage = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 200 + Math.random() * 500;
    this.speed = 0.12 + Math.random() * 0.25;

    this.loadImages(this.walkingImage);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.movLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.walkingImage);
    }, 100);
  }
}
