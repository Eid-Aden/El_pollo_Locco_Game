/**
 * Class representing the bottle status bar in the game.
 * Shows how many bottles the player has collected.
 */
class Bottles extends DrawableObj {
  BollteIMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  percentage = 0;

  /**
   * Creates an instance of the Bottles class.
   * Loads images and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.BollteIMAGES);
    this.x = 50;
    this.y = 80;
    this.height = 50;
    this.width = 250;

    this.collectedBottles = 0;
    this.totalBottles = 10;

    this.setPercentage(0);
  }

  /**
   * Sets the percentage of collected bottles and updates the image.
   * @param {number} collectedBottles - The number of bottles collected by the player.
   * @param {number} totalBottles - The total number of bottles available in the level.
   */
  setPercentage(collectedBottles) {
    this.collectedBottles = collectedBottles;
    let path = this.BollteIMAGES[this.bottleBar()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to display based on the current percentage.
   * @returns {number} Index of the image to show from the IMAGES array.
   */
  bottleBar() {
    return Math.min(5, Math.max(0, this.collectedBottles));
  }
}
