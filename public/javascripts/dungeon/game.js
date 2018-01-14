var HEIGHT = 320,
	WIDTH = 480;

var game = new Phaser.Game(HEIGHT, WIDTH, Phaser.CANVAS, "Dungeon Crawl");
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("TitleScreen", titleScreen);
game.state.add("TheGame", theGame);
game.state.add("GameOver", gameOver);
game.state.start("Boot");