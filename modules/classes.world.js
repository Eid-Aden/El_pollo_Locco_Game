class World {
  character = new Character();
  enamies = [new Chicken(), new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(), new Cloud()];
  backgrounds = [
    new Background('/img/5_background/layers/air.png', -719),
    new Background('img/5_background/layers/3_third_layer/2.png', -719),
    new Background('img/5_background/layers/2_second_layer/2.png', -719),
    new Background('/img/5_background/layers/1_first_layer/2.png', -719),

    new Background('/img/5_background/layers/air.png', 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 0),
    new Background('/img/5_background/layers/1_first_layer/1.png', 0),

    new Background('/img/5_background/layers/air.png', 719.5),
    new Background('img/5_background/layers/3_third_layer/2.png', 719.5),
    new Background('img/5_background/layers/2_second_layer/2.png', 719.5),
    new Background('/img/5_background/layers/1_first_layer/2.png', 719.5),

    new Background('/img/5_background/layers/air.png', 719),
    new Background('img/5_background/layers/3_third_layer/2.png', 719),
    new Background('img/5_background/layers/2_second_layer/2.png', 719),
    new Background('/img/5_background/layers/1_first_layer/2.png', 719),
  ];

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
    this.addObjectsToMap(this.backgrounds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enamies);

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
