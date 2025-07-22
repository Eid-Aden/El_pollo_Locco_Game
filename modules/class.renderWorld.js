class WorldRenderer {
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
