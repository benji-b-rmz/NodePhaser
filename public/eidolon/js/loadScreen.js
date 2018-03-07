var loadScreen = function(game){};

loadScreen.prototype = {

	init: function() {
		console.log("LOADING GAME ASSETS");
	},

	preload: function() {
		// "LOADING..."" text
		var loadText = this.game.add.text(EidolonGlobals.width/2, EidolonGlobals.height/2 - 30, 'LOADING...', { font: '30px Helvetica', fill: '#ff3333', fontWeight: '700'});
		loadText.anchor.set(0.5);

		// add loading bar to screen while other assets are loaded
		var loadbar = this.add.sprite(EidolonGlobals.width/2, EidolonGlobals.height/2 + 10, 'loadbar');
		loadbar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(loadbar);

		// Environment
		this.game.load.tilemap('map', '/eidolon/assets/tilemaps/tilemap.csv', null, Phaser.Tilemap.CSV);
	    this.game.load.image('caveTiles', '/eidolon/assets/environment/caveTiles.png');
	    this.game.load.image('background', '/eidolon/assets/environment/background.png');
	    this.game.load.image('middleground', '/eidolon/assets/environment/middleground.png');

	    // sprites
	    this.game.load.spritesheet('player', '/eidolon/assets/player/player_sheet.png', 80, 80);
	    this.game.load.spritesheet('crab', '/eidolon/assets/enemies/crab-walk.png', 48, 32)
	    this.game.load.spritesheet('bullet', '/eidolon/assets/Fx/shot.png', 6, 4);
	    this.game.load.spritesheet('enemyBullet', '/eidolon/assets/Fx/enemy_shot.png', 6, 4);
	    this.game.load.spritesheet('wizard', '/eidolon/assets/enemies/wizard_fly_forward.png', 80, 80);
	    this.game.load.spritesheet('octopus', '/eidolon/assets/enemies/octopus.png', 28, 36);
	    this.game.load.image('heart', '/eidolon/assets/misc/heart.png');
	    
	    // explosions
	    this.game.load.spritesheet('roundExplosion', '/eidolon/assets/explosions/explosion-1.png', 32, 32);
	    this.game.load.spritesheet('groundExplosion', '/eidolon/assets/explosions/explosion-2.png', 64, 64);
	    this.game.load.spritesheet('largeGroundExplosion', '/eidolon/assets/explosions/explosion-3.png', 128, 80);
	    this.game.load.spritesheet('mushroomExplosion', '/eidolon/assets/explosions/explosion-4.png', 128, 128);

	    // audio files
	    this.game.load.audio('blasterSound', '/eidolon/assets/sounds/laserShot.wav');
		this.game.load.audio('jumpSound', '/eidolon/assets/sounds/jump.wav');
		this.game.load.audio('playerGrunt', '/eidolon/assets/sounds/playerGrunt.wav');
		this.game.load.audio('enemyGrunt', '/eidolon/assets/sounds/enemyGrunt.ogg');


	    // Level Maps
	    // Level 1 tilemaps
	    this.game.load.tilemap('level1_0_map', '/eidolon/assets/tilemaps/level1/level1_0.csv', null, Phaser.Tilemap.CSV);
	    this.game.load.tilemap('level1_1_map', '/eidolon/assets/tilemaps/level1/level1_1.csv', null, Phaser.Tilemap.CSV);
	    this.game.load.tilemap('level1_2_map', '/eidolon/assets/tilemaps/level1/level1_2.csv', null, Phaser.Tilemap.CSV);

	},
	
	create: function() {
		this.state.start('TitleScreen');
	},

	update: function(){}
}