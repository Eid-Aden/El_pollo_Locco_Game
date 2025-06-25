/**
 * UI component for displaying the player's collected coins.
 * Shows the coin bar with a visual fill level.
 * Inherits from DrawableObj.
 */
class Coinbar extends DrawableObj {
  /** @type {string[]} Image paths for different coin bar fill levels */
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];

  /** @type {number} Current fill percentage of the coin bar */
  percentage = 100;

  /**
   * Initializes the coin bar UI element.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 40;
    this.height = 50;
    this.width = 250;
    this.totalCoins = 10;
    this.collectedCoins = 0;
    this.setPercentage(0, 10);
  }

  /**
   * Updates the coin bar based on collected coins and total coins.
   * @param {number} collectedCoins - Number of coins the player has collected.
   * @param {number} totalCoins - Total number of coins available.
   */
  setPercentage(collectedCoins, totalCoins) {
    this.collectedCoins = collectedCoins;
    this.totalCoins = totalCoins;
    this.percentage = (this.collectedCoins / this.totalCoins) * 100;

    const path = this.IMAGES[this.coinsBar()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to show based on the percentage.
   * @returns {number} Index of the image in the IMAGES array.
   */
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
