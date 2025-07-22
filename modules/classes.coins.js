/**
 * Represents a collectible coin object in the game.
 * Inherits from MovableObjects.
 */
class Coin extends MovableObjects {
  width = 100;
  height = 100;

  /**
   * Creates a new Coin instance with a random X position.
   * Loads the coin image and sets the initial position.
   */
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.y = 150;
    this.x = 1500 + Math.random() * 900;
  }

  /**
   * Draws the collected coins text on the canvas.
   */
}
