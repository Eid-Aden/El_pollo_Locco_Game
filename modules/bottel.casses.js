class Bottles extends DrawableObj {
  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  percentage = 0;
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 80;
    this.height = 50;
    this.width = 250;
  }
}
