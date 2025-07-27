/* class BottleGround extends MovableObjects {
 */

class BottleGround extends MovableObjects {
  width = 100;
  height = 100;

  offset = {
    top: 2,
    right: 40,
    bottom: 5,
    left: 40,
  };

  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
  }
}
