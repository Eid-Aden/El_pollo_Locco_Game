/**
 * Represents a throwable object like a salsa bottle.
 * Inherits from MovableObjects and includes throw behavior.
 */
class ThrowableObjects extends MovableObjects {
  /** @type {{top: number, right: number, bottom: number, left: number}} Collision offset for bottle */

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };
  Image_RotationBottle = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];
  image_splashBottle = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];
  /**
   * Creates a new throwable object at the given position.
   * @param {number} x - Horizontal start position.
   * @param {number} y - Vertical start position.
   */

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;
    this.groundLevel = 360;
    this.offset = { top: 5, right: 15, bottom: 5, left: 15 };

    this.loadImage(this.Image_RotationBottle[0]);
    this.loadImages(this.Image_RotationBottle);
    this.loadImages(this.image_splashBottle);
    this.playBottleRotation();
    this.throw();
  }

  /**
   * Starts the throw movement and applies gravity.
   * Moves the object horizontally until it reaches a certain distance.
   */

  throw() {
    this.speedY = 10;
    this.aplyGravity();
    this.throwInterval = setInterval(() => {
      this.x += 8;
      if (this.x > 3000) {
        clearInterval(this.throwInterval);
      }
    }, 30);
  }
  playBottleRotation() {
    let i = 0;
    this.rotationInterval = setInterval(() => {
      this.img = this.imageCache[this.Image_RotationBottle[i]];
      i = (i + 1) % this.Image_RotationBottle.length;
    }, 1000 / 25); // 20 FPS
  }
}
