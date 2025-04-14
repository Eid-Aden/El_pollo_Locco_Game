class MovableObjects {
  x = 200;
  y = 60;
  img;
  height = 100;
  width = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;

  aplyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150;
  }

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

  playAnimation(images) {
    let i = this.currentImage % this.walkingImage.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
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
