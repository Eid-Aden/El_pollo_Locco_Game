const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Chicken()],

  [new Cloud(), new Cloud()],

  generateBackgrounds()
);

function generateBackgrounds() {
  const backgrounds = [];
  const tileWidth = 719.5;

  for (let i = -3; i <= 6; i++) {
    const x = i * tileWidth;

    // air layer
    backgrounds.push(new Background('/img/5_background/layers/air.png', x));

    if (i === 6) {
      // ganz rechts → full
      backgrounds.push(new Background('img/5_background/layers/3_third_layer/full.png', x));
      backgrounds.push(new Background('img/5_background/layers/2_second_layer/full.png', x));
      backgrounds.push(new Background('/img/5_background/layers/1_first_layer/full.png', x));
    } else if (i % 2 === 0) {
      // gerade → version 2
      backgrounds.push(new Background('img/5_background/layers/3_third_layer/2.png', x));
      backgrounds.push(new Background('img/5_background/layers/2_second_layer/2.png', x));
      backgrounds.push(new Background('/img/5_background/layers/1_first_layer/2.png', x));
    } else {
      // ungerade → version 1
      backgrounds.push(new Background('img/5_background/layers/3_third_layer/1.png', x));
      backgrounds.push(new Background('img/5_background/layers/2_second_layer/1.png', x));
      backgrounds.push(new Background('/img/5_background/layers/1_first_layer/1.png', x));
    }
  }

  return backgrounds;
}
