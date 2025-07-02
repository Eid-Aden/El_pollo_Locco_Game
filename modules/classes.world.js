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

  ctx;
  canvas;
  keyboard;
  camara_x = 0;
  brokenBottle = new Audio('audio/broken-bottle.mp3');
  chickenSound = new Audio('audio/chickenSound.mp3');
  backgroundSound = new Audio('audio/game-background-sound.mp3');
  gameOver = false;

  intervalIds = [];
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
    this.draw();
    this.setWorld();
    this.run();
    this.addBottles();
    this.addCoins();
    this.addChicken();
    this.addSmallChicken();
    SoundManager.register(this.brokenBottle);
    SoundManager.register(this.chickenSound);
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;
    SoundManager.register(this.backgroundSound);
    this.showBossStatus = false;

    setTimeout(() => {
      this.showBossStatus = true;
    }, 9000);
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
      this.checkCollectBottles();
      this.checkCollectCoins();
      this.isBottleColissionBoss();
      this.checkBottleHitsChickens();
    }, 100);
  }

  /**
   * Handles bottle throwing when the 'D' key is pressed and cooldown is over.
   */

  checkThrowableObjects() {
    const now = new Date().getTime();
    if (this.keyboard.D && this.collectedBottles > 0 && now - this.lastThrowTime > this.throwCooldown) {
      let offsetX = this.character.otherDirection ? -50 : 50;
      let bottle = new ThrowableObjects(this.character.x + offsetX, this.character.y + 15);
      bottle.otherDirection = this.character.otherDirection;
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
            this.bottleSplash(bottle);
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
    this.bottleSplash(bottle);
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
    this.endboss.loadImage(this.endboss.deadImage[0]);
    document.getElementById('youWin').style.display = 'block';
    this.gameOver = true;
    this.stopAllIntervals();
    SoundManager.pauseAll();
    this.stopAllEnemies();
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
   * Replaces the bottle image with the splash image.
   * @param {ThrowableObjects} bottle
   */
  bottleSplash(bottle) {
    bottle.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png');
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
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }
  /**
   * Handles the collision between character and chicken.
   * @param {Enemy} enemy
   */
  handleChickenCollision(enemy) {
    if (this.isEnemyHitFromAbove(enemy)) {
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
   * Kills the enemy and applies bounce effect to the character.
   * @param {Enemy} enemy
   */
  killEnemy(enemy) {
    SoundManager.play(this.chickenSound);
    this.character.speedY = 5;
    enemy.isDead = true;
    this.setChickensDeadImages(enemy);
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
    }, 1000);
  }
  /**
   * Applies damage to the character. Ends game if energy reaches zero.
   */
  handleCharacterHit() {
    this.character.hit();
    this.statusbar.setPercentage(this.character.energy);

    if (this.character.energy === 0) {
      this.triggerGameOver();
    }
  }
  /**
   * Displays game over screen, stops game and sounds.
   */
  triggerGameOver() {
    document.getElementById('restartBtn').style.display = 'block';
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

  /**
   * Changes the dead image for small or regular chickens.
   * @param {Chicken|SmallChicken} chicken
   */
  setChickensDeadImages(chicken) {
    if (chicken instanceof SmallChicken) {
      chicken.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    } else {
      chicken.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
  }
  /**
   * Adds regular chickens to the game world at random positions.
   */
  addChicken() {
    for (let i = 0; i < 6; i++) {
      this.x = 2500 + Math.random() * 800;
      this.speed = 0.12 + Math.random() * 0.25;
      let chicken = new Chicken();
      chicken.x = this.x;
      chicken.world = this;

      this.level.enamies.push(chicken);
    }
  }
  /**
   * Adds small chickens to the game world at random positions.
   */
  addSmallChicken() {
    for (let i = 0; i < 5; i++) {
      this.x = 2000 + Math.random() * 500;
      this.speed = 0.12 + Math.random() * 0.25;
      let small_chicken = new SmallChicken();
      small_chicken.x = this.x;
      small_chicken.world = this;
      this.level.enamies.push(small_chicken);
    }
  }
  /**
   * Adds collectible bottles to the map at random positions.
   */
  addBottles() {
    for (let i = 0; i < this.totalBottles; i++) {
      let x = 500 + Math.random() * 2500;
      let y = 380;
      let bottle = new BottleGround();
      bottle.x = x;
      bottle.y = y;
      this.bottles.push(bottle);
    }
  }
  /**
   * Checks if character collects bottles and updates the bottle bar.
   */
  checkCollectBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottles.splice(index, 1);
        this.collectedBottles++;
        this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
      }
    });
  }
  /**
   * Removes a specific bottle from the world.
   * @param {BottleGround} bottle
   */
  removeBottles(bottle) {
    let index = this.bottles.indexOf(bottle);
    if (index > -1) {
      this.bottles.splice(index, 1);
      this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
    }
  }
  /**
   * Draws the collected bottles text on the canvas.
   */
  drawBottleBarText() {
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`${this.collectedBottles} / ${this.totalBottles}`, 250, 110);
  }
  /**
   * Adds collectible coins to the map at fixed positions.
   */
  addCoins() {
    for (let i = 0; i < this.totalCoins; i++) {
      let x = 300 + i * 100;
      let y = 380;
      let coin = new Coin();
      coin.x = x;
      coin.y = y;
      this.coins.push(coin);
    }
  }
  /**
   * Checks if character collects coins and updates the coin bar.
   */
  checkCollectCoins() {
    for (let i = this.coins.length - 1; i >= 0; i--) {
      let coin = this.coins[i];
      if (this.character.isColliding(coin)) {
        this.coins.splice(i, 1);
        this.collectedCoin++;
        this.coin.setPercentage(this.collectedCoin, this.totalCoins);
      }
    }
  }
  /**
   * Removes a specific coin from the world.
   * @param {Coin} coin
   */
  reomvetCoin(coin) {
    let index = this.coins.indexOf(coin);
    if (index > -1) {
      this.coins.splice(index, 1);
      this.coins.setPercentage(5 - this.coins.length, 5);
    }
  }
  /**
   * Draws the collected coins text on the canvas.
   */
  drawCoinsText() {
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`${this.collectedCoin} / ${this.totalCoins}`, 250, 70);
  }
  /**
   * Main draw function. Clears canvas and draws all game elements.
   */
  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawFixedUI();
    this.drawGameObjects();
    this.requestNextFrame();
  }
  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  /**
   * Draws background objects with camera offset.
   */
  drawBackground() {
    this.ctx.translate(this.camara_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.ctx.translate(-this.camara_x, 0);
  }
  /**
   * Draws fixed UI elements like status bars and icons.
   */
  drawFixedUI() {
    this.addToMap(this.statusbar);
    if (this.showBossStatus) {
      this.addToMap(this.statusEndBoss);
    }
    this.addToMap(this.bottle);
    this.addToMap(this.coin);
  }
  /**
   * Draws all dynamic game objects affected by camera movement.
   */
  drawGameObjects() {
    this.ctx.translate(this.camara_x, 0);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enamies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camara_x, 0);
  }
  /**
   * Requests the next animation frame to keep the draw loop going.
   */
  requestNextFrame() {
    requestAnimationFrame(() => {
      this.draw();
      this.drawBottleBarText();
      this.drawCoinsText();
    });
  }
  /**
   * Adds multiple objects to the canvas by calling addToMap.
   * @param {Array<DrawableObject>} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  /**
   * Draws a single object to the canvas, handles flipping if needed.
   * @param {DrawableObject} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipBack(mo);
    }
  }
  /**
   * Flips the image horizontally for mirrored rendering.
   * @param {DrawableObject} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  /**
   * Restores canvas transformation after flipping.
   * @param {DrawableObject} mo
   */
  flipBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
