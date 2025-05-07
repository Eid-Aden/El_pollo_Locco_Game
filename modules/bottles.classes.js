/* class BottleBar extends MovableObjects {
  height = 100;
  width = 100;

  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = 250;
    this.y = 350;

    /*    this.x = 0 + Math.random() * 500; */
/*  this.x = 500 + Math.random() * 1000;
  } */

class BottleGround extends MovableObjects {
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;
  }
}
