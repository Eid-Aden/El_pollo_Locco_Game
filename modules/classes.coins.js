class Coin extends MovableObjects {
  height = 100;
  width = 100;
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.x = 600;
    this.y = 360;
    this.x = 1500 + Math.random() * 900;
  }
}
