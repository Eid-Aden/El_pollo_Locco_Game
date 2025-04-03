class Character extends MovableObjects {
  width = 200;
  heihgt = 280;
  y = 200;
  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
  }

  jump() {
    console.log('Character jumps!');
  }
}
