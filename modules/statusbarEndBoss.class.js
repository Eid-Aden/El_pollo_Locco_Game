/*
 * Represents the Endboss health bar UI element.
 * Inherits from DrawableObj and updates visual state based on Endboss health.
 */
class StatusBarEndBos extends DrawableObj {
  /**
   * Array of image paths representing different health levels of the Endboss.
   * Index 0 = 0%, index 5 = 100%.
   * @type {string[]}
   */
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
  ];

  /**
   * Current percentage of the Endboss's health.
   * Range: 0–100
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates the Endboss health bar and loads its image set.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.height = 50;
    this.width = 200;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed image based on the current health percentage.
   * @param {number} percentages - New health value (0–100)
   */
  setPercentage(percentages) {
    this.percentage = percentages;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = DrawableObj.globalImageCache[path];
  }

  /**
   * Determines the image index based on the percentage.
   * @returns {number} Index of the health image in the IMAGES array
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }
}
