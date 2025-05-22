class Level {
  enamies;
  clouds;
  backgrounds;
  levelEnd_x = 3500;
  bottlebar;
  coinIcon;

  constructor(enamies, clouds, backgrounds, bottlebar, coinIcon) {
    this.enamies = enamies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottlebar = bottlebar;
    this.coinIcon = coinIcon;
  }
}
