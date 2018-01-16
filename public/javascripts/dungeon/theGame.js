var theGame = function(game) {};

theGame.prototype = {
	
	init: function(){
		console.log("STARTING THE MAIN GAME");
	},
	preload: function(){},
	create: function(){
		this.createMap();
	},
	update: function(){},

	createMap: function(){
		// the csv of the map
		var map = this.game.add.tilemap('map', 16, 16);
		// the tileset corresponding to the csv
		map.addTilesetImage('tiles');
		// create the first layer using the map
		this.layer0 = map.createLayer(0);

		this.layer0.resizeWorld();

	}

}