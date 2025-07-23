/* class WorldRenderer {
  constructor(world, canvas) {
    this.world = world;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cameraX = 0;
  }

  drawLoop() {
    this.draw();
    requestAnimationFrame(() => this.drawLoop());
  }

  draw() {
    this.cameraX = -this.world.character.x + 100;
    this.clearCanvas();
    this.drawBackground();
    this.drawClouds();
    this.drawFixedUI();
    this.drawGameObjects();
    this.world.throwableObjects.forEach((bottle) => bottle.update());
    this.world.coin.drawCoinsText(this.ctx);
    this.world.bottle.drawBottleBarText(this.ctx);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.world.level.backgrounds);
    this.ctx.translate(-this.cameraX, 0);
  }

  drawClouds() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.world.level.clouds);
    this.ctx.translate(-this.cameraX, 0);
  }

  drawFixedUI() {
    this.addToMap(this.world.statusbar);
    if (this.world.showBossStatus) {
      this.addToMap(this.world.statusEndBoss);
    }
    this.addToMap(this.world.bottle);
    this.addToMap(this.world.coin);
  }

  drawGameObjects() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.world.coins);
    this.addObjectsToMap(this.world.bottles);
    this.addToMap(this.world.character);
    this.addObjectsToMap(this.world.level.enamies);
    this.addObjectsToMap(this.world.throwableObjects);
    this.ctx.translate(-this.cameraX, 0);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
 */

/**
 * Handles rendering of all visual elements in the game world.
 * Responsible for drawing the background, characters, enemies, UI, and more.
 */
class WorldRenderer {
  /**
   * Creates an instance of the WorldRenderer.
   * @param {World} world - The world instance containing game objects and state.
   * @param {HTMLCanvasElement} canvas - The canvas element where rendering occurs.
   */
  constructor(world, canvas) {
    this.world = world;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cameraX = 0;
  }

  /**
   * Starts the continuous drawing loop using requestAnimationFrame.
   */
  drawLoop() {
    this.draw();
    requestAnimationFrame(() => this.drawLoop());
  }

  /**
   * Draws the entire frame including background, clouds, UI, game objects, and text overlays.
   */
  draw() {
    this.cameraX = -this.world.character.x + 100;
    this.clearCanvas();
    this.drawBackground();
    this.drawClouds();
    this.drawFixedUI();
    this.drawGameObjects();
    this.world.throwableObjects.forEach((bottle) => bottle.update());
    this.world.coin.drawCoinsText(this.ctx);
    this.world.bottle.drawBottleBarText(this.ctx);
  }

  /**
   * Clears the canvas before drawing the next frame.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the background images and tiles, translated by the camera position.
   */
  drawBackground() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.world.level.backgrounds);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Draws cloud objects behind other elements, translated by the camera.
   */
  drawClouds() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.world.level.clouds);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Draws fixed UI elements like status bars, bottles, and coins that stay in place.
   */
  drawFixedUI() {
    this.addToMap(this.world.statusbar);
    if (this.world.showBossStatus) {
      this.addToMap(this.world.statusEndBoss);
    }
    this.addToMap(this.world.bottle);
    this.addToMap(this.world.coin);
  }

  /**
   * Draws dynamic game objects like character, enemies, coins, and bottles.
   */
  drawGameObjects() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.world.coins);
    this.addObjectsToMap(this.world.bottles);
    this.addToMap(this.world.character);
    this.addObjectsToMap(this.world.level.enamies);
    this.addObjectsToMap(this.world.throwableObjects);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Adds multiple drawable objects to the canvas.
   * @param {DrawableObj[]} objects - An array of drawable objects to render.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the canvas and handles horizontal flipping if needed.
   * @param {DrawableObj} mo - The drawable object to render.
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
   * Flips the rendering context horizontally for mirrored objects.
   * @param {DrawableObj} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the rendering context after flipping and resets the object's x position.
   * @param {DrawableObj} mo - The object to restore after flipping.
   */
  flipBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
