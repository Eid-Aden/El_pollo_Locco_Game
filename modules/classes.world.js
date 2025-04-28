class World {
  character = new Character();
  statusbar = new Statusbar();
  bottle = new Bottles();
  coin = new Coins();
  throwableObjects = [];
  level = level1;
  /* enamies = level1.enamies;
  clouds = level1.clouds;
  backgrounds = level1.backgrounds; */

  ctx;
  canvas;
  keyboard;
  camara_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }
  setWorld() {
    this.character.world = this;
  }
  //  cheking  if there  is  a colision
  run() {
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkCollisions();
    }, 200);
  }
  checkThrowableObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enamies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // waan Masaxay
    // Sawir kadib
    this.ctx.translate(this.camara_x, 0); //Back
    this.addObjectsToMap(this.level.backgrounds);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enamies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camara_x, 0);

    this.addToMap(this.statusbar);
    this.addToMap(this.bottle);
    this.addToMap(this.coin);

    let self = this; //waxay markasta   Sawiraysaa Draw
    requestAnimationFrame(() => {
      self.draw();
    });
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
    mo.drawFrame(this.ctx);

    // Blue rectangle

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
