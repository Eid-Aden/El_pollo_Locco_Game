/**
 * Character class representing the main player.
 * Extends MovableObjects and handles animations, sounds, and controls.
 */
class Character extends MovableObjects {
  /** @type {number} Ground level Y position for collision */
  groundLevel = 60;
  y = 155;
  speed = 5;
  width = 110;
  height = 380;
  isSleeping = false;

  /** @type {Object} Collision offset for precise hitbox */
  offset = {
    top: 120,
    right: 30,
    bottom: 25,
    left: 30,
  };
  /** @type {string[]} Walking animation frames */
  walkingImage = [
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-26.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  /** @type {string[]} Jumping animation frames */
  walkingJumping = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  /** @type {string[]} Death animation frames */
  walkingDead = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  /** @type {string[]} Hurt animation frames */
  walkingHurt = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  /** @type {string[]} Idle animation frames */
  idleImg = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  /** @type {string[]} Long idle animation frames (e.g. sleeping) */
  longIdleImg = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];
  world;
  walkingSound = new Audio('audio/running.mp3');
  hurtSound = new Audio('audio/hurt.mp3');
  deadSound = new Audio('audio/Dead.mp3');
  soundSnore = new Audio('audio/snore.mp3');

  /**
   * Creates a new character and loads all animation assets.
   */
  constructor() {
    super();

    this.loadImage(this.idleImg[0]);
    this.loadImages(this.walkingImage);
    this.loadImages(this.walkingJumping);
    this.loadImages(this.walkingDead);
    this.loadImages(this.walkingHurt);
    this.loadImages(this.idleImg);
    this.loadImages(this.longIdleImg);
    SoundManager.register(this.walkingSound);
    SoundManager.register(this.hurtSound);
    SoundManager.register(this.deadSound);
    SoundManager.register(this.soundSnore);

    this.aplyGravity();
    this.animate();
    this.lastMoveTime = Date.now();
  }

  /**
   * Stops snoring and resets snore state.
   */
  stopSnore() {
    if (this.isSleeping) {
      this.soundSnore.pause();
      this.soundSnore.currentTime = 0;
      this.isSleeping = false;
    }
  }

  /** @type {number[]} List of active animation interval IDs */
  intervalIds = [];

  /**
   * Starts a stoppable interval and stores its ID.
   * @param {Function} fn - Function to execute repeatedly.
   * @param {number} time - Interval delay in milliseconds.
   */
  setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * Clears all active intervals for this character.
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
    this.animateCharacterState();
  }

  /**
   * Controls character movement via keyboard.
   */
  animateMovement() {
    this.setStoppableInterval(() => {
      if (this.shouldStopGame()) return;
      this.handleRightMovement();
      this.handleLeftMovement();
      this.handleJump();
      this.updateCameraPosition();
    }, 1000 / 60);
  }

  /**
   * Returns true if the game or character is finished.
   * @returns {boolean}
   */
  shouldStopGame() {
    if (this.world?.gameOver || this.isDead() || this.world?.endboss?.isDead) {
      this.stopAllIntervals();
      return true;
    }
    return false;
  }

  handleRightMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
      this.moveRight();
      this.otherDirection = false;
      SoundManager.play(this.walkingSound);
      this.lastMoveTime = Date.now();
    }
  }

  handleLeftMovement() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.movLeft();
      this.otherDirection = true;
      SoundManager.play(this.walkingSound);
      this.lastMoveTime = Date.now();
    }
  }

  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.lastMoveTime = Date.now();
    }
  }

  updateCameraPosition() {
    this.world.camara_x = -this.x + 100;
  }

  /**
   * Controls which animation to play based on the character's state.
   */
  animateCharacterState() {
    this.setStoppableInterval(() => {
      if (this.isDead()) {
        this.handleDeathAnimation();
      } else if (this.isHurt()) {
        this.handleHurtAnimation();
      } else if (this.isAboveGround()) {
        this.handleJumpAnimation();
      } else {
        this.handleIdleAnimation();
      }
    }, 50);
  }

  /**
   * Plays the character's death animation and resets sleep state.
   * Used when the character is defeated or dies.
   */
  handleDeathAnimation() {
    this.playAnimation(this.walkingDead);
    this.stopSnore();
    this.isSleeping = false;
  }

  /**
   * Plays the hurt animation and sound when the character takes damage.
   * Also ensures the character wakes up if sleeping.
   */
  handleHurtAnimation() {
    this.playAnimation(this.walkingHurt);
    SoundManager.play(this.hurtSound);
    this.stopSnore();
    this.isSleeping = false;
  }

  /**
   * Plays the jump animation when the character jumps.
   * Also stops the snore sound and resets sleep status.
   */
  handleJumpAnimation() {
    this.playAnimation(this.walkingJumping);
    this.stopSnore();
    this.isSleeping = false;
  }

  /**
   * Handles idle animations based on time since last movement.
   * - Shows normal idle if idle time is short.
   * - Plays long idle (sleep) animation and sound after extended inactivity.
   * - Resumes walk animation if user presses left or right.
   */
  handleIdleAnimation() {
    const idleTime = (Date.now() - this.lastMoveTime) / 500;

    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.walkingImage);
      this.stopSnore();
      this.isSleeping = false;
    } else if (idleTime > 10) {
      this.playAnimation(this.longIdleImg);
      if (!this.isSleeping) {
        SoundManager.play(this.soundSnore);
        this.isSleeping = true;
      }
    } else {
      this.playAnimation(this.idleImg);
      this.stopSnore();
      this.isSleeping = false;
    }
  }

  /**
   * Checks if the character is jumping on top of an enemy.
   * @param {MovableObjects} enemy - The enemy to check collision with.
   * @returns {boolean}
   */
  isJumpingOnEnemy(enemy) {
    const characterBottom = this.y + this.height - this.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;

    const isFalling = this.speedY < 0;
    const isAbove = characterBottom <= enemyTop + 15; // etwas Toleranz
    const isHorizontalOverlap =
      this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
      this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;
    return isAbove && isFalling && isHorizontalOverlap;
  }
}
