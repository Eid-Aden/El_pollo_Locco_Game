class Background extends MovableObjects {
  width = 720;
  height = 480;

  constructor(pathImage, x) {
    super();
    this.loadImage(pathImage);
    this.x = x;
    this.y = 480 - this.height;
  }
}
