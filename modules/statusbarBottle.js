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
  collectedBottles = 0;
  totalBottles = 10;

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
    this.setPercentage(0, this.totalBottles);
  }

  /**
   * Sets the percentage of collected bottles and updates the image.
   * @param {number} collectedBottles - The number of bottles collected by the player.
   * @param {number} totalBottles - The total number of bottles available in the level.
   */
  /*   setPercentage(collectedBottles) {
    this.collectedBottles = collectedBottles;
    let path = this.BollteIMAGES[this.bottleBar()];
    this.img = this.imageCache[path];
  } */

  setPercentage(collectedBottles, totalBottles) {
    this.collectedBottles = collectedBottles;
    this.totalBottles = totalBottles;

    let percentage = (collectedBottles / totalBottles) * 100;
    this.percentage = percentage;

    let index = this.resolveImageIndexFromPercentage(percentage);
    let path = this.BollteIMAGES[index];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to display based on the current percentage.
   * @returns {number} Index of the image to show from the IMAGES array.
   */
  bottleBar() {
    return Math.min(5, Math.max(0, this.collectedBottles));
  }
  resolveImageIndexFromPercentage(percentage) {
    if (percentage >= 100) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 60) return 3;
    if (percentage >= 40) return 2;
    if (percentage >= 20) return 1;
    return 0;
  }
  /**
   * Adds bottles to the world.
   * @param {*} world
   */
  addBottles(world) {
    for (let i = 0; i < this.totalBottles; i++) {
      let x = 500 + Math.random() * 2500;
      let y = 385;
      let bottle = new BottleGround();
      bottle.x = x;
      bottle.y = y;
      world.bottles.push(bottle); // ← speichert die Flaschen in world.bottles
    }
  }
  /**
   * Checks for bottle collection and updates the bottle bar.
   * @param {*} world
   * @param {*} bottle
   */
  checkCollectBottles(world, bottle) {
    for (let i = world.bottles.length - 1; i >= 0; i--) {
      let bottle = world.bottles[i];
      if (world.character.isColliding(bottle)) {
        world.bottles.splice(i, 1);
        world.collectedBottles++;
        world.bottle.setPercentage(world.collectedBottles, world.totalBottles);
      }
    }
  }
  /**
   * Removes a specific bottle from the world.
   * @param {*} world
   * @param {*} bottle
   */
  removeBottle(world, bottle) {
    let index = world.bottles.indexOf(bottle);
    if (index > -1) {
      world.bottles.splice(index, 1);
      this.setPercentage(this.collectedBottles, this.totalBottles);
    }
  }

  /**
   * Draws the collected bottles text on the canvas.
   */
  drawBottleBarText(ctx) {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`${this.collectedBottles} / ${this.totalBottles}`, 250, 110);
  }
}
