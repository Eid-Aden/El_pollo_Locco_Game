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
  bossHits = 0;

  ctx;
  canvas;
  keyboard;
  camara_x = 0;
  brokenBottle = new Audio('audio/broken-bottle.mp3');
  chickenSound = new Audio('audio/chickenSound.mp3');
  gameOver = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endboss = new EndBoss();
    this.endboss.world = this;
    this.level.enamies.push(this.endboss);
    this.draw();
    this.setWorld();
    this.run();
    this.addBottles();
    this.addCoins();
    this.addChicken();
    this.addSmallChicken();
    SoundManager.register(this.brokenBottle);
    SoundManager.register(this.chickenSound);
  }
  setWorld() {
    this.character.world = this;
  }

  //cheking  if there  is  a colision
  run() {
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkCollisions();
      this.checkCollectBottles();
      this.checkCollectCoins();
      this.isBottleColissionBoss();
    }, 100);
  }

  checkThrowableObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
    }
  }

  isBottleColissionBoss() {
    this.throwableObjects.forEach((bottle, index) => {
      if (this.endboss && bottle.isColliding(this.endboss)) {
        this.bossHits++;

        this.bottleSplash(bottle);
        setTimeout(() => {
          this.throwableObjects.splice(index, 1);
        }, 100);

        if (this.bossHits >= 5) {
          this.endboss.isDead = true;
          this.endboss.loadImage(this.endboss.deadImage[0]);
          document.getElementById('youWin').style.display = 'block';
        } else {
          this.endboss.loadImage(this.endboss.hurtImage[0]);
        }
      }
    });
  }

  bottleSplash(bottle) {
    bottle.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png');
  }

  checkCollisions() {
    this.level.enamies.forEach((enemy) => {
      if (!this.character.isColliding(enemy)) return;

      if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
        this.handleChickenCollision(enemy);
      } else {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  handleChickenCollision(enemy) {
    if (this.character.isJumpingOnEnemy(enemy) && this.character.speedY < 0) {
      if (enemy.isDead) return;

      SoundManager.play(this.chickenSound);
      this.character.speedY = 5;
      enemy.isDead = true;
      this.setChickensDeadImages(enemy);

      setTimeout(() => {
        const index = this.level.enamies.indexOf(enemy);
        if (index > -1) {
          this.level.enamies.splice(index, 1);
        }
      }, 1000);
    } else if (!enemy.isDead) {
      this.character.hit();
      this.statusbar.setPercentage(this.character.energy);
      if (this.character.energy === 0) {
        document.getElementById('youWin').style.display = 'block';

        this.gameOver = true;

        // Bewegungen stoppen:
        this.character.speed = 0;
        this.character.speedY = 0;

        this.level.enamies.forEach((enemy) => {
          enemy.speed = 0;
          enemy.speedY = 0;
        });
      }
    }
  }

  setChickensDeadImages(chicken) {
    if (chicken instanceof SmallChicken) {
      chicken.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    } else {
      chicken.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
  }

  addChicken() {
    for (let i = 0; i < 10; i++) {
      this.x = 2500 + Math.random() * 800;
      this.speed = 0.12 + Math.random() * 0.25;
      let chicken = new Chicken();
      chicken.x = this.x;
      chicken.world = this;

      this.level.enamies.push(chicken);
    }
  }
  addSmallChicken() {
    for (let i = 0; i < 10; i++) {
      this.x = 2000 + Math.random() * 500;
      this.speed = 0.12 + Math.random() * 0.25;
      let small_chicken = new SmallChicken();
      small_chicken.x = this.x;
      small_chicken.world = this;
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

        SoundManager.play(this.brokenBottle);
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

  addCoins() {
    for (let i = 0; i < this.totalCoins; i++) {
      let x = 300 + i * 100;
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

  reomvetCoin(coin) {
    let index = this.coins.indexOf(coin);
    if (index > -1) {
      this.coins.splice(index, 1);
      this.coins.setPercentage(5 - this.coins.length, 5);
    }
  }

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
