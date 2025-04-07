class World {
  character = new Character();
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
  }
  setWorld() {
    this.character.world = this;
  }
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // waan Masaxay
    // Sawir kadib
    this.ctx.translate(this.camara_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enamies);

    this.ctx.translate(-this.camara_x, 0);

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
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
