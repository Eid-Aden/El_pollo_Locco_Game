class World {
  character = new Character();
  statusbar = new Statusbar();
  bottle = new Bottles();
  bottlebar = new BottleBar();
  coin = new Coinbar();
  coinIcon = new Coin();
  throwableObjects = [];
  level = level1;
  coins = [];
  bottles = [];
  collectedCoin = 0;
  totalCoins = 5;
  collectedBottles = 0;
  totalBottles = 10;
  PlayerGround = [];

  ctx;
  canvas;
  keyboard;
  camara_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.addBottles(); // <--- Hier hinzufügen
    /*  addCoins(); */
  }
  setWorld() {
    this.character.world = this;
  }

  //  cheking  if there  is  a colision
  run() {
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkCollisions();
      this.checkCollectBottles(); // <--- Hier hinzufügen
    }, 500);
  }

  /* get percentage() {
    return Math.min(this.PlayerGround.length * 20, 100);
  } */

  get persantage() {
    return (this.collectedBottles / this.totalBottles) * 100;
  }

  checkThrowableObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enamies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  get persantage() {
    return (this.collectedBottles / this.totalBottles) * 100;
  }

  addBottles() {
    for (let i = 0; i < this.totalBottles; i++) {
      let x = -500 + Math.random() * 2500;
      let y = 380;
      let bottle = new Bottles();
      bottle.x = x;
      bottle.y = y;
      this.bottles.push(bottle);
    }
  }

  checkCollectBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottles.splice(index, 1); // Entferne die gesammelte Flasche
        this.collectedBottles++;
        this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
      }
    });
  }

  checkCollectBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottles.splice(index, 1); // Flasche entfernen
        this.collectedBottles++; // Anzahl gesammelter Flaschen erhöhen
        this.bottle.setPercentage(this.collectedBottles, this.totalBottles); // Balken aktualisieren
        console.log('Flasche gesammelt!'); // Zum Testen
      }
    });
  }

  drawBottleBarText() {
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`${this.collectedBottles} / ${this.totalBottles}`, 250, 110);
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // waan Masaxay
    // Sawir kadib
    this.ctx.translate(this.camara_x, 0); //Back
    this.addObjectsToMap(this.level.backgrounds);

    this.ctx.translate(-this.camara_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.bottle);
    this.addToMap(this.coin);
    this.ctx.translate(this.camara_x, 0); //Back
    this.addObjectsToMap(this.level.coinIcon);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enamies);
    this.addObjectsToMap(this.throwableObjects);

    this.addObjectsToMap(this.level.bottlebar);

    this.ctx.translate(-this.camara_x, 0);

    let self = this; //waxay markasta   Sawiraysaa Draw
    requestAnimationFrame(() => {
      self.draw();
      this.drawBottleBarText();
    });
  }
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    // Blue rectangle

    if (mo.otherDirection) {
      this.flipBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
