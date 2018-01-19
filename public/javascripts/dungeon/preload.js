// Load the game assets
// display loadbar to show progress, then transition to main title screen

var preload = function(game){};

preload.prototype = {

	init: function(){
		console.log("Preloading");
	},
	preload: function(){
		// add loadbar to and set it as PreloadSprite to show progress
		var loadbar = this.add.sprite(this.world.width/2, this.world.height/2, 'loadbar');
		loadbar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(loadbar);

		// Environment
		this.load.tilemap('map', '/images/dungeon/map/tileReference.csv', null, Phaser.Tilemap.CSV);
		this.load.image('tiles', '/images/dungeon/map/mapTiles.png');

		// Sprites
		this.load.spritesheet('viking', '/images/dungeon/characters/viking.png');
		this.load.spritesheet('redWizard', '/images/dungeon/characters/redWizard.png');
		this.load.spritesheet('purpleWizard', '/images/dungeon/characters/purpleWizard.png');
		this.load.spritesheet('pirate', '/images/dungeon/characters/pirate.png');

		// Audio


	},
	create: function(){
		this.state.start('TitleScreen');
	},
	update: function(){}

}