class Background extends MovableObjects {
  x = 0;
  width = 720;
  height = 100;
  y = 380;

  constructor(pathImage) {
    super();
    this.loadImage(pathImage);
  }
}
