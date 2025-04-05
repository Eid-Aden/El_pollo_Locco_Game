class Chicken extends MovableObjects {
  y = 360;
  width = 60;
  height = 80;
  speed = 1;
  walkingChicken = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 200 + Math.random() * 500;
    this.speed = 0.12 + Math.random() * 0.25;

    this.loadImages(this.walkingChicken);
    this.animate();
  }

  animate() {
    this.movLeft();
    setInterval(() => {
      let i = this.currentImage % this.walkingChicken.length;
      let path = this.walkingChicken[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }
}
