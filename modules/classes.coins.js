class Coin extends MovableObjects {
  height = 100;
  width = 50;
  constructor() {
    super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
    this.x = 650;
    this.y = 150;
    this.x = 1500 + Math.random() * 900;
  }
}
