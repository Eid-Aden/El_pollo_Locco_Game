/**
 * Represents a collectible coin object in the game.
 * Inherits from MovableObjects.
 */
class Coin extends MovableObjects {
  /** @type {number} Width of the coin image in pixels */
  width = 100;

  /** @type {number} Height of the coin image in pixels */
  height = 100;

  /**
   * Creates a new Coin instance with a random X position.
   * Loads the coin image and sets the initial position.
   */
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');

    // Starting Y position on the ground
    this.y = 360;

    // Random X position between 1500 and 2400
    this.x = 1500 + Math.random() * 900;
  }
}
