var HEIGHT = 320,
	WIDTH = 480;

var DungeonGame = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "Dungeon Crawl");
DungeonGame.state.add("Boot", boot);
DungeonGame.state.add("Preload", preload);
DungeonGame.state.add("TitleScreen", titleScreen);
DungeonGame.state.add("TheGame", theGame);
DungeonGame.state.add("GameOver", gameOver);
DungeonGame.state.start("Boot");