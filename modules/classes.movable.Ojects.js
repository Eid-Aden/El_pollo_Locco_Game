class MovableObjects {
  x = 200;
  y = 350;
  img;
  height = 100;
  width = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log('Hello Test Ini Zelations');
  }

  movLeft() {}
}
