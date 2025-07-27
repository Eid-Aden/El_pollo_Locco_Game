/**
 * Represents a throwable salsa bottle object.
 * Inherits from MovableObjects and handles throw physics and animations.
 */
class ThrowableObjects extends MovableObjects {
  offset = { top: 5, right: 15, bottom: 5, left: 15 };

  /** @type {string[]} Bottle rotation animation image paths */
  Image_RotationBottle = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  /** @type {string[]} Splash animation image paths */
  image_splashBottle = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /**
   * Creates a new throwable object instance and initiates image loading.
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   * @param {boolean} otherDirection - Whether the throw is to the left
   * @param {World} world - Reference to the game world
   */
  constructor(x, y, otherDirection, world) {
    super();
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.world = world;
    this.width = 80;
    this.height = 100;
    this.speedY = -5 + Math.random();
    this.gravity = 0.2;
    this.throwSpeed = 8;
    this.groundLevel = 460;
    this.hasExploded = false;

    this.loadImage(this.Image_RotationBottle[0]);
    this.loadImages(this.Image_RotationBottle);
    this.loadImages(this.image_splashBottle);

    setTimeout(() => this.playBottleRotation(), 100);
  }

  /**
   * Called in the game loop. Moves the bottle and checks ground impact.
   */
  update() {
    if (this.hasExploded) return;

    this.y += this.speedY;
    this.speedY += this.gravity;

    this.x += this.otherDirection ? -this.throwSpeed : this.throwSpeed;

    if (this.x > 3000 || this.x < -200) {
      this.removeFromWorld();
    }

    if (this.isOnGround()) {
      this.hasExploded = true;
      setTimeout(() => this.playSplashAnimation(), 100);
    }
  }

  /**
   * Checks if the bottle has reached the ground.
   * @returns {boolean}
   */
  isOnGround() {
    return this.y + this.height >= this.groundLevel;
  }

  /**
   * Plays the splash animation frame by frame when the bottle hits the ground.
   */
  playSplashAnimation() {
    let i = 0;
    const splashInterval = setInterval(() => {
      const path = this.image_splashBottle[i];
      const img = DrawableObj.globalImageCache[path];

      if (img) {
        this.img = img;
        i++;
      } else {
        console.warn('Splash image not loaded:', path);
      }

      if (i >= this.image_splashBottle.length) {
        clearInterval(splashInterval);
        this.removeFromWorld();
      }
    }, 1000 / 60);
  }

  /**
   * Rotates the bottle using animation frames while flying through the air.
   */
  playBottleRotation() {
    let i = 0;
    this.rotationInterval = setInterval(() => {
      if (!this.hasExploded) {
        const path = this.Image_RotationBottle[i];
        const img = DrawableObj.globalImageCache[path];

        if (img) {
          this.img = img;
          i = (i + 1) % this.Image_RotationBottle.length;
        }
      } else {
        clearInterval(this.rotationInterval);
      }
    }, 1000 / 25);
  }

  /**
   * Removes this object from the world's list of throwable objects.
   */
  removeFromWorld() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index > -1) {
      this.world.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Optional: Immediately switch to a fixed splash image.
   */
  showSplash() {
    this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png');
  }
}
