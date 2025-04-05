class Cloud extends MovableObjects {
  y = 20;
  width = 650;
  height = 100;
  constructor() {
    super();
    this.loadImage('img/5_background/layers/4_clouds/full.png');
    this.x = 200 + Math.random() * 500;
    this.animate();
  }

  animate() {
    this.movLeft();
  }

  movLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
