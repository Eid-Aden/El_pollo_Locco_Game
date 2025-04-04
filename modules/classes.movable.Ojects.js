class MovableObjects {
  x = 200;
  y = 280;
  img;
  height = 100;
  width = 150;
  imageCache = {};

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

      this.imageCache[path] = path;
    });
  }

  moveRight() {
    console.log('Hello Test Ini Zelations');
  }

  movLeft() {}
}
