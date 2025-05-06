class Coin extends MovableObjects {
  height = 100;
  width = 100;
  constructor() {
    super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
    this.x = 450;
    this.y = 150;
    this.x = 400 + Math.random() * 800;
  }
}
