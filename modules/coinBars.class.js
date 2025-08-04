/**
 * UI component for displaying the player's collected coins.
 * Shows the coin bar with a visual fill level.
 * Inherits from DrawableObj.
 */
/**
 * Represents the status bar for collected coins in the game.
 * Extends DrawableObj to display the progress of coin collection.
 */
class Coinbar extends DrawableObj {
  /**
   * Array of image paths representing the coin bar at different fill levels.
   * @type {string[]}
   */
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];

  /**
   * Current fill percentage of the coin bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * List of coins in the world.
   * @type {Coin[]}
   */
  coins = [];

  /**
   * Creates an instance of the Coinbar.
   * Loads the images and sets default position and dimensions.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 40;
    this.width = 250;
    this.height = 50;
    this.totalCoins = 10;
    this.collectedCoins = 0;
    this.setPercentage(0, this.totalCoins);
  }

  /**
   * Updates the coin bar based on collected coins and total coins.
   * @param {number} collectedCoins - Number of collected coins.
   * @param {number} totalCoins - Total number of coins available.
   */
  setPercentage(collectedCoins, totalCoins) {
    this.collectedCoins = collectedCoins;
    this.totalCoins = totalCoins;
    this.percentage = (this.collectedCoins / this.totalCoins) * 100;

    const index = StatusBarUtil.resolveImageIndex(this.percentage);
    const path = this.IMAGES[index];
    this.img = DrawableObj.globalImageCache[path];
  }

  /**
   * Adds coins to the world at predefined positions.
   * @param {World} world - The current game world.
   */
  addCoins(world) {
    for (let i = 0; i < this.totalCoins; i++) {
      const x = 500 + i * 200;
      const y = 100;
      const coin = new Coin();
      coin.x = x;
      coin.y = y;
      world.coins.push(coin);
    }
  }

  /**
   * Checks if the character collects any coins and updates the bar.
   * @param {World} world - The current game world.
   */
  checkCollectCoins(world) {
    for (let i = world.coins.length - 1; i >= 0; i--) {
      const coin = world.coins[i];
      const distance = MovableObjects.getDistance(world.character, coin);
      if (distance < 40) {
        world.coins.splice(i, 1);
        this.collectedCoins++;
        this.setPercentage(this.collectedCoins, this.totalCoins);
      }
    }
  }

  /**
   * Removes a specific coin from the internal list and updates percentage.
   * @param {Coin} coin - The coin to be removed.
   */
  reomvetCoin(coin) {
    const index = this.coins.indexOf(coin);
    if (index > -1) {
      this.coins.splice(index, 1);
      this.setPercentage(this.collectedCoins, this.totalCoins);
    }
  }

  /**
   * Draws the collected coin count as text on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawCoinsText(ctx) {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`${this.collectedCoins} / ${this.totalCoins}`, 250, 70);
  }
}
