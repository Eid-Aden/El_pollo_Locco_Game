/**
 * The World class handles the entire game environment, including character control,
 * enemy logic, collision detection, collectible tracking, and drawing everything to the canvas.
 */
class World {
  character = new Character();
  statusbar = new Statusbar();
  statusEndBoss = new StatusBarEndBos();
  bottle = new Bottles();
  bottlebar = new BottleGround();
  coin = new Coinbar();
  coinIcon = new Coin();
  throwableObjects = [];
  level = level1;
  coins = [];
  bottles = [];
  collectedCoin = 0;
  totalCoins = 5;
  collectedBottles = 0;
  totalBottles = 10;
  bossHits = 0;
  lastThrowTime = 0;
  throwCooldown = 500;
  groundLevel = 360;
  escapedChickens = 0;
  ctx;
  canvas;
  keyboard;
  camara_x = 0;
  brokenBottle = new Audio('audio/broken-bottle.mp3');
  chickenSound = new Audio('audio/chickenSound.mp3');
  backgroundSound = new Audio('audio/game-background-sound.mp3');
  endbossAlarm = new Audio('audio/BossAlarm.mp3');

  gameOver = false;

  intervalIds = [];
  /**
   * Creates the world and initializes all components.
   * @param {HTMLCanvasElement} canvas - The game's drawing canvas.
   * @param {Object} keyboard - The keyboard input handler.
   */

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endboss = new EndBoss();
    this.endboss.world = this;
    this.level.enamies.push(this.endboss);
    this.setWorld();
    this.run();
    this.bottle.addBottles(this);
    this.coin.addCoins(this);
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;
    SoundManager.register(this.brokenBottle);
    SoundManager.register(this.chickenSound);
    SoundManager.register(this.endbossAlarm);

    SoundManager.register(this.backgroundSound);
    this.showBossStatus = false;
    this.renderer = new WorldRenderer(this, this.canvas);
    this.renderer.drawLoop();
    setTimeout(() => {
      this.showBossStatus = true;
    }, 9000);
  }

  /**
   * Creates an interval that can be stopped later using stopAllIntervals().
   * @param {Function} fn
   * @param {number} time
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }
  /**
   * Stops all intervals created by setStoppableInterval.
   */
  stopAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  /**
   * Assigns the world instance to the character so it can access shared game logic.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loop for collision detection and item collection.
   */
  run() {
    this.setStoppableInterval(() => {
      this.checkThrowableObjects();
      this.checkCollisions();
      this.bottle.checkCollectBottles(this);
      this.coin.checkCollectCoins(this);
      this.isBottleColissionBoss();
      this.checkBottleHitsChickens();
      this.checkEscapedChickens();
    }, 100);
  }
  /**
   * Increases the counter for escaped chickens and ends the game if needed.
   * @param {Chicken|SmallChicken} chicken - The escaping chicken.
   */
  countEscapedChicken(chicken) {
    chicken.isEscaped = true;
    this.escapedChickens++;
    this.removeChicken(chicken);
    if (this.escapedChickens >= 4) {
      this.triggerGameOver();
    }
  }

  /**
   * Checks all chickens if they've escaped the screen.
   */
  checkEscapedChickens() {
    this.level.enamies.forEach((enemy) => {
      const hasEscaped =
        (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
        !enemy.isDead &&
        !enemy.isEscaped &&
        enemy.x + enemy.width < 0;
      if (hasEscaped) {
        this.countEscapedChicken(enemy);
      }
    });
  }

  /**
   * Removes a chicken from the level.
   * @param {Chicken|SmallChicken} chicken - The chicken to remove.
   */
  removeChicken(chicken) {
    const index = this.level.enamies.indexOf(chicken);
    if (index > -1) {
      this.level.enamies.splice(index, 1);
    }
  }

  /**
   * Handles bottle throwing when the 'D' key is pressed and cooldown is over.
   */

  checkThrowableObjects() {
    const now = new Date().getTime();
    if (this.keyboard.D && this.collectedBottles > 0 && now - this.lastThrowTime > this.throwCooldown) {
      this.character.stopSnore();
      this.character.lastMoveTime = Date.now();
      let offsetX = this.character.otherDirection ? -50 : 50;
      let bottle = new ThrowableObjects(
        this.character.x + offsetX,
        this.character.y + this.character.height / 2,
        this.character.otherDirection,
        this
      );
      bottle.world = this;
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
      this.lastThrowTime = now;
    }
  }
  /**
   * Checks if any thrown bottles hit the EndBoss.
   */

  isBottleColissionBoss() {
    this.throwableObjects.forEach((bottle, index) => {
      let distance = Math.abs(this.endboss.x - this.character.x);
      if (distance <= 500 && this.isBottleHittingBoss(bottle)) {
        this.handleBottleHit(bottle, index);
      }
    });
  }

  /**
   * Checks if a specific bottle collides with the EndBoss.
   * @param {ThrowableObjects} bottle
   * @returns {boolean}
   */
  isBottleHittingBoss(bottle) {
    return this.endboss && bottle.isColliding(this.endboss);
  }

  /**
   * Checks if any bottle hits a chicken (Chicken or SmallChicken)
   * that is within 300px from the character.
   * Plays splash animation and removes bottle and chicken on hit.
   */

  checkBottleHitsChickens() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enamies.forEach((enemy) => {
        if ((enemy instanceof Chicken || enemy instanceof SmallChicken) && !enemy.isDead && bottle.isColliding(enemy)) {
          let distance = Math.abs(this.character.x - enemy.x);
          if (distance < 300) {
            this.bottle.bottleSplash(bottle);
            SoundManager.play(this.brokenBottle);
            this.removeBottleAfterDelay(bottleIndex);
            this.killEnemy(enemy);
          }
        }
      });
    });
  }
  /**
   * Handles the logic when a bottle hits the EndBoss.
   * @param {ThrowableObjects} bottle
   * @param {number} index - Index of the bottle in the array.
   */

  handleBottleHit(bottle, index) {
    SoundManager.play(this.brokenBottle);
    bottle.showSplash();
    this.removeBottleAfterDelay(index);
    this.reduceBossEnergy(15);
    this.statusEndBoss.setPercentage(this.endboss.energy);
    if (this.endboss.energy <= 0) {
      this.killEndBoss();
    } else {
      this.endboss.loadImage(this.endboss.hurtImage[0]);
    }
  }

  /**
   * Removes the bottle after a short delay.
   * @param {number} index
   */

  removeBottleAfterDelay(index) {
    setTimeout(() => {
      this.throwableObjects.splice(index, 1);
    }, 50);
  }

  /**
   * Reduces EndBoss's energy by a given amount.
   * @param {number} amount
   */

  reduceBossEnergy(amount) {
    this.endboss.energy -= amount;
    if (this.endboss.energy < 0) {
      this.endboss.energy = 0;
    }
  }

  /**
   * Executes when the EndBoss dies: shows win screen, stops game.
   */

  killEndBoss() {
    this.endboss.isDead = true;
    this.gameOver = true;
    this.stopAllIntervals();
    SoundManager.pauseAll();
    this.stopAllEnemies();
    SoundManager.play(this.endbossAlarm);
    this.endboss.playAnimation(this.endboss.deadImage);

    setTimeout(() => {
      document.getElementById('youWinOverlay').style.display = 'flex';
    }, 2000);
  }

  /**
   * Stops all enemies’ movement and logic intervals.
   */

  stopAllEnemies() {
    this.level.enamies.forEach((enemy) => {
      if (typeof enemy.stopAllIntervals === 'function') {
        enemy.stopAllIntervals();
      }
    });
  }

  /**
   * Checks for collisions between the character and all enemies.
   */

  checkCollisions() {
    this.level.enamies.forEach((enemy) => {
      if (!this.character.isColliding(enemy)) return;
      if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
        this.handleChickenCollision(enemy);
      } else {
        this.character.hit();
        this.statusbar.updateHealthBar(this.character.energy);
        this.character.stopSnore();
        this.character.lastMoveTime = Date.now();
      }
    });
  }

  /**
   * Handles the collision between character and chicken.
   * @param {Enemy} enemy
   */

  handleChickenCollision(enemy) {
    if (this.character.isJumpingOnEnemy(enemy)) {
      this.killEnemy(enemy);
    } else if (!enemy.isDead) {
      this.handleCharacterHit();
    }
  }

  /**
   * Checks if the character is jumping on an enemy.
   * @param {Enemy} enemy
   * @returns {boolean}
   */

  isEnemyHitFromAbove(enemy) {
    return this.character.isJumpingOnEnemy(enemy) && this.character.speedY < 0 && !enemy.isDead;
  }

  /**
   * 
   
   * Kills the enemy and applies bounce effect to the character.
   * @param {Enemy} enemy
   */

  killEnemy(enemy) {
    // 1. Einen kurzen Beep starten
    SoundManager.play(this.chickenSound);

    // 2. Nach 200 ms stoppen und zurücksetzen
    setTimeout(() => {
      this.chickenSound.pause();
      this.chickenSound.currentTime = 0;
    }, 400);

    // 3. Rest deines Codes
    enemy.isDead = true;
    this.removeEnemyAfterDelay(enemy);
  }

  /**
   * Removes the given enemy after 1 second.
   * @param {Enemy} enemy
   */

  removeEnemyAfterDelay(enemy) {
    setTimeout(() => {
      const index = this.level.enamies.indexOf(enemy);
      if (index > -1) {
        this.level.enamies.splice(index, 1);
      }
    }, 500);
  }

  /**
   * Applies damage to the character. Ends game if energy reaches zero.
   */

  handleCharacterHit() {
    this.character.hit();
    this.statusbar.updateHealthBar(this.character.energy);
    this.character.stopSnore();
    this.character.lastMoveTime = Date.now();
    if (this.character.energy <= 1) {
      this.character.energy = 0;
      this.character.playAnimation(this.character.walkingDead);
      setTimeout(() => {
        this.triggerGameOver();
      }, 2000);
    }
  }

  /**
   * Displays game over screen, stops game and sounds.
   */

  triggerGameOver() {
    document.querySelector('.hollcontainer').style.display = 'flex';
    document.getElementById('restart-overlayNone').style.display = 'flex';
    document.getElementById('gameOverImg').style.display = 'block';
    document.getElementById('restart-button').style.display = 'flex';
    this.gameOver = true;
    this.stopAllIntervals();
    this.stopAllEnemies();
    SoundManager.pauseAll();
  }

  /**
   * Stops all enemies’ movement and logic intervals.
   */

  stopAllEnemies() {
    this.level.enamies.forEach((enemy) => {
      if (typeof enemy.stopAllIntervals === 'function') {
        enemy.stopAllIntervals();
      }
    });
  }
}
