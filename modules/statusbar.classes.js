class Statusbar extends DrawableObj {
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // Index 0
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png', // Index 1
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', // Index 2
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png', // Index 3
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', // Index 4
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', // Index 5
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 0;
    this.height = 50;
    this.width = 250;
    this.setPercentage(100);
  }

  setPercentage(percentages) {
    this.percentage = percentages;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
