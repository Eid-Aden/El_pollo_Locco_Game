class World {
  character = new Character();
  anamies = [new Chicken(), new Chicken(), new Chicken(), new Chicken()];
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw();
  }
  draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.heihgt);
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }
}
