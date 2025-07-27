/*** Initializes the first level with chickens, clouds, backgrounds, a bottle ground, and coins. */

function initLevel1() {
  const chickens = [];
  const smallChickens = [];

  for (let i = 0; i < 5; i++) {
    const chicken = new Chicken();
    chickens.push(chicken);
  }

  for (let i = 0; i < 5; i++) {
    const smallChicken = new SmallChicken();
    smallChickens.push(smallChicken);
  }

  level1 = new Level(
    [...chickens, ...smallChickens],
    [new Cloud(), new Cloud()],
    generateBackgrounds(),
    [new BottleGround()],
    [new Coin()]
  );
}

/**
 * Generates an array of background layers with parallax images,
 * based on a tile layout for a scrolling level.
 *
 * @returns {Background[]} Array of Background instances
 */
function generateBackgrounds() {
  const backgrounds = [];
  const tileWidth = 719.0;

  for (let i = -3; i <= 6; i++) {
    const x = i * tileWidth;
    backgrounds.push(new Background('img/5_background/layers/air.png', x));
    addLayerImages(backgrounds, x, i);
  }

  return backgrounds;
}

/**
 * Adds layered background images based on the tile index.
 *
 * @param {Background[]} backgrounds - Array to which backgrounds are added
 * @param {number} x - The x position for this tile
 * @param {number} i - The current tile index
 */
function addLayerImages(backgrounds, x, i) {
  const layerBase = 'img/5_background/layers';

  if (i === 6) {
    backgrounds.push(new Background(`${layerBase}/3_third_layer/full.png`, x));
    backgrounds.push(new Background(`${layerBase}/2_second_layer/full.png`, x));
    backgrounds.push(new Background(`${layerBase}/1_first_layer/full.png`, x));
  } else {
    const suffix = i % 2 === 0 ? '2.png' : '1.png';
    backgrounds.push(new Background(`${layerBase}/3_third_layer/${suffix}`, x));
    backgrounds.push(new Background(`${layerBase}/2_second_layer/${suffix}`, x));
    backgrounds.push(new Background(`${layerBase}/1_first_layer/${suffix}`, x));
  }
}
