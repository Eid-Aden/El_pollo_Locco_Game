class MovableObjects extends DrawableObj {
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
  energy = 100;
  lastHurt = 0;

  aplyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObjects) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

  // character isColiding  Chicken//
  isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHurt = new Date().getTime();
    }
  }
  isDead() {
    return this.energy === 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHurt; // deferent  in ms
    timePassed = timePassed / 100; // deferent  in s
    /*    console.log(timePassed); */
    return timePassed < 0.5;
  }
  /**
   *
   * @param {Array} arr   with  fue  Imaages
   */
  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;

      this.imageCache[path] = this.img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  movLeft() {
    this.x -= this.speed;
  }
  jump() {
    this.speedY = 35;
  }
}
