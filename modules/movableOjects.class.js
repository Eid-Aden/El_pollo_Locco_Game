/**
 * Base class for all movable objects in the game.
 * Adds movement, gravity, collision, and animation logic.
 */
class MovableObjects extends DrawableObj {
  offset = { top: 0, right: 0, bottom: 0, left: 0 };
  x = 180;
  y = 60;
  groundLevel = 220;
  width = 120;
  height = 100;
  speed = 0.12;
  speedY = 0;
  accelaration = 2;
  otherDirection = false;
  energy = 100;
  lastHurt = 0;
  currentImage = 0;

  /**
   * Applies gravity to the object by adjusting vertical position in intervals.
   */
  aplyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
      if (this.y >= this.groundLevel) {
        this.y = this.groundLevel;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   */
  isAboveGround() {
    if (this instanceof ThrowableObjects) return true;
    return this.y < this.groundLevel;
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    return (Date.now() - this.lastHurt) / 100 < 0.5;
  }

  /**
   * Checks collision with another object using AABB logic.
   * @param {MovableObjects} mo - The object to check against
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Plays a frame-based animation using globally cached images.
   * @param {string[]} images - Image paths
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    this.img = DrawableObj.globalImageCache[images[i]];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  movLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 20;
  }

  /**
   * Reduces energy and marks object as hurt.
   */
  hit() {
    this.energy = Math.max(0, this.energy - 1);
    if (this.energy > 0) {
      this.lastHurt = Date.now();
    }
  }

  /**
   * Calculates distance between two objects (center to center).
   */
  static getDistance(obj1, obj2) {
    const centerX1 = obj1.x + obj1.width / 2;
    const centerY1 = obj1.y + obj1.height / 2;
    const centerX2 = obj2.x + obj2.width / 2;
    const centerY2 = obj2.y + obj2.height / 2;
    return Math.hypot(centerX1 - centerX2, centerY1 - centerY2);
  }
}
