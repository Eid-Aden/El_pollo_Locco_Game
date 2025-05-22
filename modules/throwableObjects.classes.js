class ThrowableObjects extends MovableObjects {
  offset = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  constructor(x, y) {
    super();
    this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.aplyGravity();
    this.throwInterval = setInterval(() => {
      this.x += 10;
      if (this.x > 3000) {
        clearInterval(this.throwInterval);
      }
    }, 15);
  }
}
