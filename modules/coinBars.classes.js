class Coinbar extends DrawableObj {
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 40;
    this.height = 50;
    this.width = 250;
    this.totalCoins = 10; // <-- zuerst totalCoins setzen
    this.collectedCoins = 0;
    this.setPercentage(0, 10); // <-- dann setPercentage aufrufen
  }

  setPercentage(collectedCoins, totalCoins) {
    this.collectedCoins = collectedCoins;
    this.totalCoins = totalCoins;
    this.percentage = (this.collectedCoins / this.totalCoins) * 100;
    let path = this.IMAGES[this.coinsBar()];
    this.img = this.imageCache[path];
  }

  coinsBar() {
    if (this.percentage == 0) {
      return 5;
    } else if (this.percentage <= 20) {
      return 1;
    } else if (this.percentage <= 40) {
      return 2;
    } else if (this.percentage <= 60) {
      return 3;
    } else if (this.percentage <= 80) {
      return 4;
    } else if (this.percentage <= 100) {
      return 5;
    } else {
      return 0;
    }
  }
}
