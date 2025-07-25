/**
 * Base class for all movable game objects like characters, enemies, and items.
 * Handles movement, gravity, collisions, and animations.
 */
class MovableObjects extends DrawableObj {
  offset = { top: 0, right: 0, bottom: 0, left: 0 };
  x = 180;
  y = 60;
  groundLevel = 220;
  img;
  width = 120;
  height = 100;
  speed = 0.12;
  speedY = 0;
  accelaration = 2;
  otherDirection = false;
  energy = 100;
  lastHurt = 0;
  imageCache = {};
  currentImage = 0;

  /**
   * Applies gravity to the object.
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
   * Checks if the object is above the ground.
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
   * Checks if this object is colliding with another.
   * @param {MovableObjects} mo - Other object to check collision with.
   * @returns {boolean}
   */

  /* isColliding(mo) {
    return (
      this.x + this.width > mo.x && this.x < mo.x + mo.width && this.y + this.height > mo.y && this.y < mo.y + mo.height
    );
  } */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Loads multiple images into cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation by cycling through cached images.
   * @param {string[]} images - Animation frame paths.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
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
   * Reduces energy when hit.
   */
  hit() {
    this.energy = Math.max(0, this.energy - 1);
    if (this.energy > 0) {
      this.lastHurt = Date.now();
    }
  }
  /**
   * Calculates the distance between two movable objects.
   * @param {MovableObjects} obj1
   * @param {MovableObjects} obj2
   * @returns {number}
   */
  static getDistance(obj1, obj2) {
    let centerX1 = obj1.x + obj1.width / 2;
    let centerY1 = obj1.y + obj1.height / 2;
    let centerX2 = obj2.x + obj2.width / 2;
    let centerY2 = obj2.y + obj2.height / 2;

    return Math.sqrt(Math.pow(centerX1 - centerX2, 2) + Math.pow(centerY1 - centerY2, 2));
  }
}
