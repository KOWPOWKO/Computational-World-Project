var gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./BlueKnightSpriteSheet.png");

ASSET_MANAGER.downloadAll(function() {


	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    gameEngine.init(ctx);
    gameEngine.addEntity(new Hero(gameEngine,0,0,"./BlueKnightSpriteSheet.png"));
    // this.hero = new Hero();
    // hero.draw(ctx);
    gameEngine.start();
});