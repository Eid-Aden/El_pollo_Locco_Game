class Chicken extends MovableObjects {
  y = 360;
  width = 60;
  height = 80;

  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 200 + Math.random() * 500;
  }
}
