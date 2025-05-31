class Character extends MovableObjects {
  groundLevel = 180;
  y = 160;
  speed = 20;
  speedY = 0;
  width = 200;
  height = 280;
  isSleeping = false;

  offset = {
    top: 20,
    right: 20,
    bottom: 0,
    left: 20,
  };

  walkingImage = [
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-26.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  walkingJumping = [
    '/img/2_character_pepe/3_jump/J-31.png',
    '/img/2_character_pepe/3_jump/J-32.png',
    '/img/2_character_pepe/3_jump/J-33.png',
    '/img/2_character_pepe/3_jump/J-34.png',
    '/img/2_character_pepe/3_jump/J-35.png',
    '/img/2_character_pepe/3_jump/J-36.png',
    '/img/2_character_pepe/3_jump/J-37.png',
    '/img/2_character_pepe/3_jump/J-38.png',
    '/img/2_character_pepe/3_jump/J-39.png',
  ];

  walkingDead = [
    '/img/2_character_pepe/5_dead/D-51.png',
    '/img/2_character_pepe/5_dead/D-52.png',
    '/img/2_character_pepe/5_dead/D-53.png',
    '/img/2_character_pepe/5_dead/D-54.png',
    '/img/2_character_pepe/5_dead/D-55.png',
    '/img/2_character_pepe/5_dead/D-56.png',
    '/img/2_character_pepe/5_dead/D-57.png',
  ];

  walkingHurt = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

  idleImg = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];
  longIdleImg = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  world;
  walkingSound = new Audio('audio/running.mp3');
  hurtSound = new Audio('audio/hurt.mp3');
  deadSound = new Audio('audio/Dead.mp3');
  soundSnore = new Audio('audio/snore.mp3');

  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.walkingHurt);
    this.loadImages(this.walkingDead);
    this.loadImages(this.walkingJumping);
    this.loadImages(this.walkingImage);
    this.loadImages(this.idleImg);
    this.loadImages(this.longIdleImg);
    this.lastMoveTime = Date.now();

    //  Sound beim SoundManager registrieren
    SoundManager.register(this.walkingSound);
    SoundManager.register(this.hurtSound);
    SoundManager.register(this.deadSound);
    SoundManager.register(this.soundSnore);

    this.aplyGravity();
    this.animate();
  }

  stopSnore() {
    if (this.isSleeping) {
      this.soundSnore.pause();
      this.soundSnore.currentTime = 0;
      this.isSleeping = false;
    }
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
        this.moveRight();
        this.otherDirection = false;
        SoundManager.play(this.walkingSound);
        this.lastMoveTime = Date.now(); // Bewegung erkannt
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.movLeft();
        this.otherDirection = true;
        SoundManager.play(this.walkingSound);
        this.lastMoveTime = Date.now(); // Bewegung erkannt
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.lastMoveTime = Date.now(); // Sprung erkannt
      }

      this.world.camara_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.walkingDead);
        this.stopSnore(); // Wacht beim Schmerz auf
        this.isSleeping = false;
      } else if (this.isHurt()) {
        this.playAnimation(this.walkingHurt);

        SoundManager.play(this.hurtSound);

        this.stopSnore(); // Wacht beim Schmerz auf
        this.isSleeping = false;
      } else if (this.isAboveGround()) {
        this.playAnimation(this.walkingJumping);
        this.stopSnore(); // Auch beim Springen aufwachen
        this.isSleeping = false;
      } else {
        let idleTime = (Date.now() - this.lastMoveTime) / 1000;

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.walkingImage);
          this.stopSnore();
          this.isSleeping = false;
        } else if (idleTime > 10) {
          this.playAnimation(this.longIdleImg);
          if (!this.isSleeping) {
            SoundManager.play(this.soundSnore);
            this.isSleeping = true;
          }
        } else {
          this.playAnimation(this.idleImg);
          this.stopSnore();
          this.isSleeping = false;
        }
      }
    }, 50);
  }

  // The Jumping Function:

  isJumpingOnEnemy(enemy) {
    const cBottom = this.y + this.height - this.offset.bottom;
    const cTop = this.y + this.offset.top;
    const eTop = enemy.y + enemy.offset.top;
    const eBottom = enemy.y + enemy.height - enemy.offset.bottom;

    const verticalHit = cBottom >= eTop && cTop < eTop + 10;
    const horizontalHit =
      this.x + this.width - this.offset.right > enemy.x + enemy.offset.left && this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;

    return verticalHit && horizontalHit;
  }

  // Stopping All Sound in my Game

  pauseAllSounds() {
    if (this.soundSnore) {
      this.soundSnore.pause();
      this.soundSnore.currentTime = 0;
    }
    if (this.walkingSound) {
      this.walkingSound.pause();
      this.walkingSound.currentTime = 0;
    }
    if (this.jumpSound) {
      this.jumpSound.pause();
      this.jumpSound.currentTime = 0;
    }
    if (this.hurtSound) {
      this.hurtSound.pause();
      this.hurtSound.currentTime = 0;
    }
    if (this.brokenBottle) {
      this.brokenBottle.pause();
      this.brokenBottle.currentTime = 0;
    }
  }
}
