/**
 * Class representing the bottle status bar in the game.
 * Shows how many bottles the player has collected.
 */
class Bottles extends DrawableObj {
  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  percentage = 0;
  collectedBottles = 0;
  totalBottles = 10;

  /**
   * Creates an instance of the Bottles class.
   * Loads images and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 80;
    this.height = 50;
    this.width = 250;

    this.setPercentage(0, this.totalBottles);
  }

  /**
   * Sets the percentage of collected bottles and updates the image.
   * @param {number} collectedBottles - The number of bottles collected by the player.
   * @param {number} totalBottles - The total number of bottles available in the level.
   */
  setPercentage(collectedBottles, totalBottles) {
    this.collectedBottles = collectedBottles;
    this.totalBottles = totalBottles;

    if (this.totalBottles > 0) {
      this.percentage = (this.collectedBottles / this.totalBottles) * 100;
    } else {
      this.percentage = 0;
    }

    let path = this.IMAGES[this.bottleBar()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to display based on the current percentage.
   * @returns {number} Index of the image to show from the IMAGES array.
   */
  bottleBar() {
    if (this.percentage == 0) {
      return 0;
    } else if (this.percentage <= 20) {
      return 1;
    } else if (this.percentage <= 40) {
      return 2;
    } else if (this.percentage <= 60) {
      return 3;
    } else if (this.percentage <= 80) {
      return 4;
    } else {
      return 5;
    }
  }
}
