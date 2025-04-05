class Character extends MovableObjects {
  width = 200;
  height = 280;
  y = 160;

  walkingCharacter = [
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-26.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];
  world;
  speed = 5;
  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');

    this.loadImages(this.walkingCharacter);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camara_x = -this.x;
    }, 1000 / 60);
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.walkingCharacter.length;
        let path = this.walkingCharacter[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {
    console.log('Character jumps!');
  }
}
