class Character extends MovableObjects {
  width = 200;
  height = 280;
  y = 160;

  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
  }

  jump() {
    console.log('Character jumps!');
  }
}
