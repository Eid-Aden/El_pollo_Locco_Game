class World {
  character = new Character();
  enamies = [new Chicken(), new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgrounds = [new Background('img/5_background/layers/3_third_layer/1.png')];
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

    this.enamies.forEach((enamy) => {
      this.ctx.drawImage(enamy.img, enamy.x, enamy.y, enamy.width, enamy.height);
    });
    this.clouds.forEach((cloud) => {
      this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
    });
    this.backgrounds.forEach((backgrounds) => {
      this.ctx.drawImage(backgrounds.img, backgrounds.x, backgrounds.y, backgrounds.width, backgrounds.height);
    });

    let self = this; //waxay markasta   Sawiraysaa Draw
    requestAnimationFrame(() => {
      // Isla Function iyana waxa ay halkii Second 26 jeer ina Tusaysaa Animation kan
      self.draw();
    });
  }
}
