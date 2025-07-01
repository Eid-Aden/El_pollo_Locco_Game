/**
 * @class EndBoss
 * @extends MovableObjects
 * @classdesc
 * Represents the final boss enemy in the game.
 * Handles animation states (walk, alert, attack, hurt, dead),
 * movement logic, and damage system when attacking the character.
 */

class EndBoss extends MovableObjects {
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  energy = 100;

  width = 350;
  height = 430;
  y = 50;

  intervalIds = [];
  /** @type {string[]} Walking animation image paths */
  walkingImage = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
  ];
  /** @type {string[]} Alert animation image paths */
  alertImage = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  /** @type {string[]} Attack animation image paths */
  attackImage = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  /** @type {string[]} Hurt animation image paths */
  hurtImage = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];
  /** @type {string[]} Death animation image paths */
  deadImage = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];
  /**
   * Constructs the EndBoss object.
   * Initializes all images and starts animations.
   */
  constructor() {
    super();
    this.x = 3000;
    this.speed = 0.8 + Math.random() * 0.3;

    this.isDead = false;
    this.energy = 100;

    this.loadImage(this.walkingImage[0]);
    this.loadImages(this.walkingImage);
    this.loadImages(this.attackImage);
    this.loadImages(this.alertImage);
    this.loadImages(this.hurtImage);
    this.loadImages(this.deadImage);
    this.playAnimation(this.alertImage);
    this.animate();
  }

  /**
   * Creates a tracked interval that can be stopped later.
   * @param {Function} fn - Function to execute repeatedly.
   * @param {number} time - Interval duration in ms.
   */

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
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
   * Initializes behavior loops: movement after delay and attack loop.
   */
  animate() {
    setTimeout(() => {
      this.startMovementLoop();
    }, 15000);

    this.startAttackLoop();
  }
  /**
   * Determines if the EndBoss should approach the character.
   * @returns {boolean} True if distance to character > 100px
   */
  shouldMoveTowardsCharacter() {
    const character = this.world.character;
    const distance = Math.abs(this.x - character.x);

    return distance > 100;
  }
  /**
   * Starts loop to move the EndBoss toward the character.
   */
  startMovementLoop() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      if (this.world?.character && this.shouldMoveTowardsCharacter()) {
        this.movLeft();
      }
    }, 1000 / 60);
  }
  /**
   * Starts attack animation loop that checks character proximity.
   */
  startAttackLoop() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      if (this.isDead) {
        this.loadImage(this.deadImage[0]);
        return;
      }
      if (!this.world?.character) {
        this.playAnimation(this.walkingImage);
        return;
      }
      const character = this.world.character;
      const distance = Math.abs(this.x - character.x);

      this.handleCharacterAttack(character, distance);
    }, 200);
  }
  /**
   * Handles EndBoss behavior depending on distance to character.
   * @param {Character} character - The main character
   * @param {number} distance - Distance to the character
   */
  handleCharacterAttack(character, distance) {
    if (distance < 400) {
      this.playAlertAndAttackAnimation(character, distance);
    } else {
      this.playAnimation(this.attackImage);
    }
  }
  /**
   * Plays the alert or attack animation based on character proximity.
   * @param {Character} character
   * @param {number} distance
   */
  playAlertAndAttackAnimation(character, distance) {
    this.playAnimation(this.alertImage);
    if (distance < 300) {
      this.playAnimation(this.attackImage);
      this.inflictDamageToCharacter(character);
    }
  }
  /**
   * Reduces the character's energy and triggers death if needed.
   * Updates UI and stops game if the character dies.
   * @param {Character} character
   */
  inflictDamageToCharacter(character) {
    character.isSleeping = false;
    if (character.energy > 0) {
      character.energy -= 3;
      if (character.energy < 0) character.energy = 0;

      this.world.statusbar.setPercentage(character.energy);

      if (character.energy <= 0) {
        character.isDead = true;
        this.world.gameOver = true;
        this.stopAllIntervals();
        this.world.stopAllIntervals();
        character.playAnimation(character.walkingDead);
        document.getElementById('gameOverEndBos').style.display = 'block';
        SoundManager.pauseAll();
      } else {
        character.playAnimation(character.walkingHurt);
      }
    }
  }
}
