/**
 * Represents a throwable object like a salsa bottle.
 * Inherits from MovableObjects and includes throw behavior.
 */
class ThrowableObjects extends MovableObjects {
  /** @type {{top: number, right: number, bottom: number, left: number}} Collision offset for bottle */
  offset = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  /**
   * Creates a new throwable object at the given position.
   * @param {number} x - Horizontal start position.
   * @param {number} y - Vertical start position.
   */
  constructor(x, y) {
    super();
    this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.throw();
  }

  /**
   * Starts the throw movement and applies gravity.
   * Moves the object horizontally until it reaches a certain distance.
   */
  throw() {
    this.speedY = 30;
    this.aplyGravity();
    this.throwInterval = setInterval(() => {
      this.x += 10;
      if (this.x > 3000) {
        clearInterval(this.throwInterval);
      }
    }, 15);
  }
}
