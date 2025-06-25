class World {
  character = new Character();
  statusbar = new Statusbar();
  statusEndBoss = new StatusBarEndBos();
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
  lastThrowTime = 0;
  throwCooldown = 500;

  ctx;
  canvas;
  keyboard;
  camara_x = 0;
  brokenBottle = new Audio('audio/broken-bottle.mp3');
  chickenSound = new Audio('audio/chickenSound.mp3');
  backgroundSound = new Audio('audio/game-background-sound.mp3');
  gameOver = false;

  intervalIds = [];

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  stopAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

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
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;

    SoundManager.register(this.backgroundSound);
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.setStoppableInterval(() => {
      this.checkThrowableObjects();
      this.checkCollisions();
      this.checkCollectBottles();
      this.checkCollectCoins();
      this.isBottleColissionBoss();
    }, 100);
  }

  checkThrowableObjects() {
    const now = new Date().getTime();
    if (
      this.keyboard.D &&
      this.collectedBottles > 0 &&
      now - this.lastThrowTime > this.throwCooldown
    ) {
      let bottle = new ThrowableObjects(this.character.x + 200, this.character.y + 200);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
      this.lastThrowTime = now;
    }
  }

  isBottleColissionBoss() {
    this.throwableObjects.forEach((bottle, index) => {
      if (this.endboss && bottle.isColliding(this.endboss)) {
        this.bottleSplash(bottle);
        setTimeout(() => {
          this.throwableObjects.splice(index, 1);
        }, 50);

        this.endboss.energy -= 15;
        if (this.endboss.energy < 0) {
          this.endboss.energy = 0;
        }

        this.statusEndBoss.setPercentage(this.endboss.energy);

        if (this.endboss.energy <= 0) {
          this.endboss.isDead = true;
          this.endboss.loadImage(this.endboss.deadImage[0]);
          document.getElementById('youWin').style.display = 'block';
          this.gameOver = true;
          this.stopAllIntervals();
          SoundManager.pauseAll();

          this.level.enamies.forEach((enemy) => {
            if (typeof enemy.stopAllIntervals === 'function') {
              enemy.stopAllIntervals();
            }
          });

          SoundManager.pauseAll();
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
        document.getElementById('restartBtn').style.display = 'block';
        this.gameOver = true;
        this.stopAllIntervals();
        SoundManager.pauseAll();
        this.level.enamies.forEach((enemy) => {
          if (typeof enemy.stopAllIntervals === 'function') {
            enemy.stopAllIntervals();
          }
        });

        SoundManager.pauseAll();
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
    for (let i = 0; i < 6; i++) {
      this.x = 2500 + Math.random() * 800;
      this.speed = 0.12 + Math.random() * 0.25;
      let chicken = new Chicken();
      chicken.x = this.x;
      chicken.world = this;

      this.level.enamies.push(chicken);
    }
  }
  addSmallChicken() {
    for (let i = 0; i < 5; i++) {
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
        this.bottles.splice(index, 1);
        this.collectedBottles++;
        this.bottle.setPercentage(this.collectedBottles, this.totalBottles);
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

  checkCollectCoins() {
    for (let i = this.coins.length - 1; i >= 0; i--) {
      let coin = this.coins[i];
      if (this.character.isColliding(coin)) {
        this.coins.splice(i, 1);
        this.collectedCoin++;
        this.coin.setPercentage(this.collectedCoin, this.totalCoins);

        SoundManager.play(this.brokenBottle);
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

    this.addToMap(this.statusEndBoss);

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
