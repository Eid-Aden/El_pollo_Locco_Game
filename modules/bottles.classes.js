/* class BottleGround extends MovableObjects {
 */

class BottleGround extends MovableObjects {
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;

    this.offset = {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    };
  }
}
