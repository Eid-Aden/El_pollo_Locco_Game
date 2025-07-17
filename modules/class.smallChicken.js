/**
 * Represents a small chicken enemy that walks and can be defeated.
 * Inherits movement and animation logic from MovableObjects.
 */
class SmallChicken extends MovableObjects {
  y = 400;
  width = 60;
  height = 80;
  speed = 1;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  /** @type {string[]} Walking animation frames */
  walkingImage = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  /** @type {string[]} Image shown when the chicken is dead */
  deadImage = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
   * Creates a SmallChicken with random X position and speed.
   */
  constructor() {
    super();
    this.loadImage(this.walkingImage[0]);
    this.loadImages(this.walkingImage);
    this.x = 1500 + Math.random() * 500;
    this.speed = 0.8 + Math.random() * 0.2;
    this.animate();
    this.isDead = false;
  }

  /** @type {number[]} List of interval IDs to manage animation timers */
  intervalIds = [];

  /**
   * Runs a stoppable interval and stores its ID.
   * @param {Function} fn - The function to run repeatedly.
   * @param {number} time - The interval time in ms.
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * Clears all intervals for this object (e.g., on game over or death).
   */
  stopAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  /**
   * Starts both movement and animation loops.
   */
  animate() {
    this.animateMovment();
    this.animateCharacter();
  }

  /**
   * Animates horizontal movement.
   */
  animateMovment() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead || this.world?.endboss?.isDead) return;
      this.movLeft();
    }, 1000 / 60);
  }

  /**
   * Animates walking or dead image based on state.
   */
  animateCharacter() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver) return;

      if (!this.isDead) {
        this.playAnimation(this.walkingImage);
      } else {
        this.loadImage(this.deadImage[0]);
      }
    }, 100);
  }
}
