/**
 * Represents a normal chicken enemy that walks and makes sounds.
 * Inherits from MovableObjects.
 */
class Chicken extends MovableObjects {
  y = 355;

  width = 70;
  height = 70;
  speed = 1;

  /** @type {boolean} Indicates if the chicken is dead */
  isDead = false;
  /** @type {string[]} Walking animation frames */
  walkingImage = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  deadImage = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  walkingSound = new Audio('audio/chickenSound.mp3');

  /**
   * Creates a Chicken with random position and speed.
   */
  constructor() {
    super();

    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImage(this.deadImage);
    this.x = 2000 + Math.random() * 700;
    this.speed = 0.18 + Math.random() * 0.5;
    this.loadImages(this.walkingImage);
    this.animate();
    this.isDead = false;
    SoundManager.register(this.walkingSound);
  }

  /**
   * Plays the chicken sound.
   */
  cluck() {
    SoundManager.play(this.walkingSound);
  }

  /** @type {number[]} Interval IDs for animation control */
  intervalIds = [];

  /**
   * Starts a stoppable interval.
   * @param {Function} fn - Function to call repeatedly.
   * @param {number} time - Interval duration in milliseconds.
   */
  setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * Stops all active intervals.
   */
  stopAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  /**
   * Starts movement and animation loops.
   */
  animate() {
    this.animateMovement();
    this.animateCharacter();
  }

  /**
   * Moves the chicken left while alive.
   */
  animateMovement() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      this.movLeft();
      if (this.x < -100 && this.world) {
        this.stopAllIntervals();
        this.world.countEscapedChicken(this);

        console.log('Chicken escaped! Total escaped:', this.world.escapedChickens);
      }
    }, 1000 / 60);
  }

  /**
   * Animates walking or dead state based on chicken's life status.
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
