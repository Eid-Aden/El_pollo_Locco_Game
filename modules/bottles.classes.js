/* class BottleGround extends MovableObjects {
 */

class BottleGround extends MovableObjects {
  width = 100;
  height = 40;

  offset = {
    top: 5,
    right: 15,
    bottom: 5,
    left: 15,
  };

  y = 380;
  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
  }
}
