class MovableObjects {
  x = 200;
  y = 280;
  img;
  height = 100;
  width = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr   with  fulle  Imaages
   */
  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;

      this.imageCache[path] = this.img;
    });
  }

  moveRight() {
    console.log('Hello Test Ini Zelations');
  }

  movLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
