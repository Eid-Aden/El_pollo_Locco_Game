class Character extends MovableObjects {
  constructor() {
    super(); // Ruft den Konstruktor der Elternklasse auf
    this.loadImage('img/2_character_pepe/2_walk/W-21.png'); // Jetzt wird img gesetzt
  }

  jump() {
    console.log('Character jumps!');
  }
}
