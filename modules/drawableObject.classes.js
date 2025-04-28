class DrawableObj {
  x = 200;
  y = 60;
  img;
  height = 100;
  width = 150;
  currentImage = 0;
  imageCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    // Prozentzahl drüber zeichnen
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText(this.percentage, this.x + this.width / 1.5, this.y + this.height / 1.3);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;

      this.imageCache[path] = this.img;
    });
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '4';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, +this.width, this.height);
      ctx.stroke();
    }
  }
}
