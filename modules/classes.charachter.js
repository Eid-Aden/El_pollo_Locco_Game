class Character extends MovableObjects {
  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
  }

  jump() {
    console.log('Character jumps!');
  }
}
