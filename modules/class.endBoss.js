class EndBoss extends MovableObjects {
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  energy = 100;

  width = 350;
  height = 430;
  y = 50;

  walkingImage = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
  ];

  alertImage = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  attackImage = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  hurtImage = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  deadImage = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
    super();
    this.x = 3300;
    this.speed = 0.8 + Math.random() * 0.3;

    this.isDead = false;
    this.energy = 100;

    this.loadImage(this.walkingImage[0]);
    this.loadImages(this.walkingImage);
    this.loadImages(this.attackImage);
    this.loadImages(this.alertImage);
    this.loadImages(this.hurtImage);
    this.loadImages(this.deadImage);
    this.playAnimation(this.alertImage);
    this.animate();
  }

  intervalIds = [];

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  stopAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  animate() {
    this.startMovementLoop();
    this.startAttackLoop();
  }
  startMovementLoop() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      console.log('EndBoss bewegt sich nach links, X:', this.x);
      this.movLeft();
    }, 1000 / 60);
  }

  startAttackLoop() {
    this.setStoppableInterval(() => {
      if (this.world?.gameOver || this.isDead) return;
      if (this.isDead) {
        this.loadImage(this.deadImage[0]);
        return;
      }
      if (!this.world?.character) {
        this.playAnimation(this.walkingImage);
        return;
      }
      const character = this.world.character;
      const distance = Math.abs(this.x - character.x);

      this.handleCharacterAttack(character, distance);
    }, 200);
  }

  handleCharacterAttack(character, distance) {
    if (distance < 400) {
      this.playAlertAndAttackAnimation(character, distance);
    } else {
      this.playAnimation(this.walkingImage);
    }
  }

  playAlertAndAttackAnimation(character, distance) {
    this.playAnimation(this.alertImage);
    if (distance < 300) {
      this.playAnimation(this.attackImage);
      this.inflictDamageToCharacter(character);
    }
  }

  inflictDamageToCharacter(character) {
    if (character.energy > 0) {
      character.energy -= 2;
      if (character.energy < 0) character.energy = 0;
      this.world.statusbar.setPercentage(character.energy);
      character.playAnimation(character.walkingHurt);
      if (character.energy <= 0) {
        character.isDead = true;
        this.world.gameOver = true;
        document.getElementById('gameOverEndBos').style.display = 'block';
        this.world.stopAllIntervals();
        SoundManager.pauseAll();
      }
    }
  }
}
