class Statusbar extends DrawableObj {
  images = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];
  percentages = 100;

  constructor() {
    this.loadImages(this.images);
  }

  setPercentage(percentages) {
    this.setPercentage = percentages;
    let imagePath = this.images(this.resolveImageIndex());
    this.imageCache[path] = this.img;
  }

  resolveImageIndex() {
    if (this.percentages === 100) {
      return 5;
    } else if (this.percentages === 80) {
      return 4;
    } else if (this.percentages === 60) {
      return 3;
    } else if (this.percentages === 40) {
      return 2;
    } else if (this.percentages === 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
