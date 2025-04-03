class Background extends MovableObjects {
  width = 720;
  height = 300;

  constructor(pathImage, x, y) {
    super();
    this.loadImage(pathImage);
    this.x = x;
    this.y = y;
  }
}
