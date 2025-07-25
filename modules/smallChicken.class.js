class SmallChicken extends MovableObjects {
  y = 355;
  width = 70;
  height = 70;
  speed = 1;

  /** @type {boolean} Whether the chicken is dead */
  isDead = false;

  /** @type {boolean} Whether the dead image has already been shown */
  deadImageLoaded = false;

  /** @type {string[]} Walking animation frames */
  walkingImage = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  /** @type {string[]} Image shown when the chicken is dead */
  deadImage = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /** @type {number[]} List of interval IDs to manage animation timers */
  intervalIds = [];

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
  }

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
    this.animateMovement();
    this.animateCharacter();
  }

  /**
   * Animates horizontal movement.
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
   * Animates walking or shows dead image (only once).
   */
  animateCharacter() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver) return;

      if (!this.isDead) {
        this.playAnimation(this.walkingImage);
      } else if (!this.deadImageLoaded) {
        this.loadImage(this.deadImage[0]);
        this.deadImageLoaded = true;
      }
    }, 100);
  }

  /**
   * Kills the chicken and stops movement.
   * This method should be called instead of setting isDead = true directly.
   */
  markAsDead() {
    if (!this.isDead) {
      this.isDead = true;
      this.deadImageLoaded = false;
      this.stopAllIntervals();
    }
  }
}
