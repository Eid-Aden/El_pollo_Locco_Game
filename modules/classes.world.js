class World {
  character = new Character();
  enamies = [new Chicken(), new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgrounds = [new Background('img/5_background/layers/3_third_layer/1.png', 0, 180)];
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // waan Masaxay Sawir kadib
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enamies);
    this.addObjectsToMap(this.backgrounds);

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
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
