class World {
  character = new Character();
  statusbar = new Statusbar();
  bottle = new Bottles();
  bottlebar = new BottleGround();
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
  brokenBottle = new Audio('audio/broken-bottle.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.addBottles(); // <--- Hier hinzufügen
    this.addCoins();
    this.addChicken();
    this.addSmallChicken();
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
      this.checkCollectCoins();
    }, 500);
  }

  checkThrowableObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.collectedBottles--; // Anzahl verringern
      this.bottle.setPercentage(this.collectedBottles, this.totalBottles); // Flaschenbalken aktualisie
    }
  }

  checkCollisions() {
    this.level.enamies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.y + this.character.height <= enemy.y + 10) {
          enemy.isDead = true;
          this.setChickensDeadImages(enemy);
          setTimeout(() => {
            let index = this.level.enamies.indexOf(enemy);
            if (index > -1) {
              this.level.enamies.splice(index, 1);
            }
          }, 100);
        } else {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  }

  setChickensDeadImages(chicken) {
    if (chicken instanceof SmallChicken) {
      chicken.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    } else {
      chicken.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
  }

  addChicken() {
    for (let i = 0; i < 5; i++) {
      this.x = 2000 + Math.random() * 500;
      this.speed = 0.12 + Math.random() * 0.25;
      let chicken = new Chicken();
      chicken.x = this.x;
      this.level.enamies.push(chicken);
    }
  }
  addSmallChicken() {
    for (let i = 0; i < 5; i++) {
      this.x = 1000 + Math.random() * 500;
      this.speed = 0.12 + Math.random() * 0.25;
      let small_chicken = new SmallChicken();
      small_chicken.x = this.x;
      this.level.enamies.push(small_chicken);
    }
  }

  addBottles() {
    for (let i = 0; i < this.totalBottles; i++) {
      let x = -500 + Math.random() * 2500;
      let y = 380;
      let bottle = new BottleGround();
      bottle.x = x;
      bottle.y = y;
      this.bottles.push(bottle);
    }
  }

  checkCollectBottles() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottles.splice(index, 1); // Flasche entfernen

        this.collectedBottles++; // Anzahl gesammelter Flaschen erhöhen
        this.bottle.setPercentage(this.collectedBottles, this.totalBottles); // Balken aktualisieren
        console.log('Flasche gesammelt!'); // Zum Testen
        this.brokenBottle.play();
      }
    });
  }

  removeBottles(bottle) {
    let index = this.bottles.indexOf(bottle);
    if (index > -1) {
      this.bottles.splice(index, 1);
      this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
    }
  }

  drawBottleBarText() {
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`${this.collectedBottles} / ${this.totalBottles}`, 250, 110);
  }

  // here Comming Icoins Logical Code

  /*  ADD Conis */
  addCoins() {
    for (let i = 0; i < this.totalCoins; i++) {
      let x = 300 + i * 100; // Sicher sichtbar
      let y = 380;
      let coin = new Coin();
      coin.x = x;
      coin.y = y;
      this.coins.push(coin);
    }
  }

  /*  Check CoinCollected*/

  checkCollectCoins() {
    for (let i = this.coins.length - 1; i >= 0; i--) {
      let coin = this.coins[i];
      if (this.character.isColliding(coin)) {
        this.coins.splice(i, 1);
        this.collectedCoin++;
        this.coin.setPercentage(this.collectedCoin, this.totalCoins);

        console.log('Coins gesammelt!');
        this.brokenBottle.play();
      }
    }
  }

  // Remove Coins After Collisions
  reomvetCoin(coin) {
    let index = this.coins.indexOf(coin);
    if (index > -1) {
      this.coins.splice(index, 1);
      this.coins.setPercentage(5 - this.coins.length, 5);
    }
  }

  // Drwing

  drawCoinsText() {
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`${this.collectedCoin} / ${this.totalCoins}`, 250, 70);
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
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enamies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camara_x, 0);

    let self = this; //waxay markasta   Sawiraysaa Draw
    requestAnimationFrame(() => {
      self.draw();
      this.drawBottleBarText();
      this.drawCoinsText();
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
