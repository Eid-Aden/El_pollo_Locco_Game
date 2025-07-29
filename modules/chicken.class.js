/**
 * Represents a normal chicken enemy that walks and makes sounds.
 * Inherits from MovableObjects.
 */
class Chicken extends MovableObjects {
  y = 355;
  width = 70;
  height = 70;

  speed = 1;
  isDead = false;
  deadImageLoaded = false;

  /** @type {string[]} Walking animation frames */
  walkingImage = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  /** @type {string[]} Dead image path */
  deadImage = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  walkingSound = new Audio('audio/chickenSound.mp3');

  /** @type {number[]} Interval IDs for animation control */
  intervalIds = [];

  constructor() {
    super();
    this.loadImage(this.walkingImage[0]);
    this.loadImages(this.walkingImage);
    this.x = 600 + Math.random() * 2700;
    this.speed = 0.8 + Math.random() * 0.5;
    SoundManager.register(this.walkingSound);
    this.animate();
  }

  /**
   * Starts movement and animation loops.
   */
  animate() {
    this.animateMovement();
    this.animateCharacter();
  }

  /**
   * Movement logic for the chicken.
   */
  animateMovement() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead || this.world?.endboss?.isDead) return;
      this.movLeft();
      if (this.x < -100 && this.world) {
        this.stopAllIntervals();
        this.world.countEscapedChicken(this);
      }
    }, 1000 / 60);
  }

  /**
   * Animates walking (or shows dead image once if dead).
   */
  animateCharacter() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver) ryxeturn;

      if (!this.isDead) {
        this.playAnimation(this.walkingImage);
      } else if (!this.deadImageLoaded) {
        this.loadImage(this.deadImage[0]);
        this.deadImageLoaded = true;
      }
    }, 100);
  }

  /**
   * Stops all active intervals.
   */
  stopAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  /**
   * Starts a stoppable interval and stores its ID.
   */
  setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * Marks the chicken as dead and stops its logic.
   */
  markAsDead() {
    if (!this.isDead) {
      this.isDead = true;
      this.deadImageLoaded = false;
      this.stopAllIntervals();
    }
  }

  /* luck() {
    setTimeout(() => {
      SoundManager.play(this.walkingSound);
    }, 60);
   */
}
