/**
 * Represents a throwable object like a salsa bottle.
 * Inherits from MovableObjects and includes throw behavior.
 */

class ThrowableObjects extends MovableObjects {
  offset = { top: 5, right: 15, bottom: 5, left: 15 };

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

  constructor(x, y, otherDirection, world) {
    super();
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.world = world;
    this.width = 80;
    this.height = 100;

    this.speedY = -5 + Math.random() * 1;
    this.gravity = 0.2;
    this.throwSpeed = 8;
    this.groundLevel = 460;

    this.hasExploded = false;

    this.loadImage(this.Image_RotationBottle[0]);
    this.loadImages(this.Image_RotationBottle);
    this.loadImages(this.image_splashBottle);

    this.playBottleRotation();
  }

  /**
   * Wird bei jedem Frame im World-Loop aufgerufen.
   * Bewegt die Flasche und prüft, ob sie den Boden trifft.
   */
  update() {
    if (this.hasExploded) return;

    this.y += this.speedY;
    this.speedY += this.gravity;

    if (this.otherDirection) {
      this.x -= this.throwSpeed;
    } else {
      this.x += this.throwSpeed;
    }

    if (this.x > 3000 || this.x < -200) {
      this.removeFromWorld();
    }

    if (this.isOnGround()) {
      this.hasExploded = true;
      setTimeout(() => {
        this.playSplashAnimation();
      }, 100);
    }
  }

  /**
   * Gibt true zurück, wenn Flasche Boden erreicht hat.
   */
  isOnGround() {
    return this.y + this.height >= this.groundLevel;
  }

  /**
   * Animation beim Aufprall mit Bildwechseln.
   */
  playSplashAnimation() {
    let i = 0;
    const splashInterval = setInterval(() => {
      if (i < this.image_splashBottle.length) {
        this.img = this.imageCache[this.image_splashBottle[i]];
        i++;
      } else {
        clearInterval(splashInterval);
        this.removeFromWorld();
      }
    }, 1000 / 60);
  }

  /**
   * Entfernt die Flasche aus der Welt.
   */
  removeFromWorld() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index > -1) {
      this.world.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Dreht die Flasche während des Wurfs.
   */
  playBottleRotation() {
    let i = 0;
    this.rotationInterval = setInterval(() => {
      if (!this.hasExploded) {
        this.img = this.imageCache[this.Image_RotationBottle[i]];
        i = (i + 1) % this.Image_RotationBottle.length;
      } else {
        clearInterval(this.rotationInterval);
      }
    }, 1000 / 25);
  }
}
