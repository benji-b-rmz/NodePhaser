var preload = function(game){};

preload.prototype = {

	init: function() {
		console.log("LOADING GAME ASSETS");
	},

	preload: function() {
		// add loading bar to screen while other assets are loaded
		this.loadbar = this.add.sprite(EidolonGlobals.width/2, EidolonGlobals.height/2, 'loadbar');
		this.loadbar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.loadbar);

		// Environment
		this.game.load.tilemap('map', '/eidolon/assets/tilemaps/tilemap.csv', null, Phaser.Tilemap.CSV);
	    this.game.load.image('caveTiles', '/eidolon/assets/environment/tiles.png');
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
	    
	    // audio files
	    this.game.load.audio('blasterSound', '/eidolon/assets/sounds/laserShot.wav');
		this.game.load.audio('jumpSound', '/eidolon/assets/sounds/jump.wav');
		this.game.load.audio('playerGrunt', '/eidolon/assets/sounds/playerGrunt.wav');
		this.game.load.audio('enemyGrunt', '/eidolon/assets/sounds/enemyGrunt.ogg');
	},
	
	create: function() {
		this.state.start('TitleScreen');
	},

	update: function(){}
}