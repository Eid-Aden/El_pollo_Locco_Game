class MovableObjects {
  x = 200;
  y = 40;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log('Hello Test Ini Zelations');
  }

  movLeft() {}
}
